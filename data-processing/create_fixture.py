"""
Create a JSON file suitable to be loaded into the Django SQL database, from
data in the cache folder. Some of the fields are calculated here, such as the
facility type or the region name.

Example:
    python create_fixture.py locations/ ../django-server/openParking/api/fixtures/fixture.json

"""

import json
from sys import argv
from os import listdir
from os.path import isfile, join


def get_facility_type(facility):
    """Returns True if the facility has a geometry area, False otherwise."""
    if facility["staticData"] is not None \
            and "specifications" in facility["staticData"] \
            and len(facility["staticData"]["specifications"]) > 0 \
            and facility["staticData"]["specifications"][0] is not None \
            and "areaGeometry" in facility["staticData"]["specifications"][0] \
            and "coordinates" in facility["staticData"]["specifications"][0]["areaGeometry"]:
        return "onstreet"
    else:
        return "offstreet"


def get_region_name(facility):
    """Return the region name of a facility, based on its province."""
    if "province" in facility and facility["province"] is not None:
        provinces = {
            ("Noord-Holland", "Utrecht", "Flavoland"): "Noordwest-Nederland",
            ("Zuid-Holland", "Zeeland"): "Zuidwest-Nederland",
            ("Noord-Brabant", "Limburg"): "Zuid-Nederland",
            ("Gelderland", "Overijsel"): "Oost-Nederland",
            ("Groningen", "Friesland", "Drenthe"): "Noord-Nederland"
        }
        for province_list, region in provinces.items():
            if facility["province"] in province_list:
                return region
    return None

def is_not_none(value, key, is_array=False):
    """Checks whether a value is contained in the object, and that it is not None."""
    return value is not None and key in value and value[key] is not None and (not is_array or len(value[key]) > 0)

def get_mark(facilityType, longitude, latitude, staticData):
    if facilityType == "onstreet":
        return "onstreet"
    else:
        numberFields = 0
        # Checks geolocation fields
        if longitude is not None and latitude is not None:
            numberFields += 1

        # Dive in static data
        if staticData is not None:
            for field in ("tariffs", "contactPersons", "openingHours"):
                if is_not_none(staticData, field, True):
                    numberFields += 1
            if is_not_none(staticData, "specification", True):
                specs = staticData["specifications"]
                for field in ("capacity", "minimumHeightInMeters"):
                    if is_not_none(specs, field):
                        numberFields += 1
        if numberFields > 5:
            return "good"
        elif numberFields > 2:
            return "average"
        else:
            return "bad"

def get_usage(staticData):
    if staticData is not None and is_not_none(staticData, "specifications", True):
        specs = staticData["specifications"][0]
        if is_not_none(specs, "usage"):
            return specs["usage"]
    return None


input_directory = argv[1]
output_filename = argv[2]

file_list = [f for f in listdir(input_directory)
             if isfile(join(input_directory, f))]

output_json = []

print("Loading data from {}...".format(input_directory))
# Database primary key counter
pk = 1
for filename in file_list:
    facility = json.load(open(join(input_directory, filename)))
    fields = {
        "name": facility["name"],
        "uuid": facility["uuid"],
        "staticDataUrl": facility["staticDataUrl"],
        "staticData": json.dumps(facility["staticData"]),
        "dynamicDataUrl": facility.get("dynamicDataUrl", None),
        "limitedAccess": facility["limitedAccess"],
        "latitude": facility["geoLocation"]["latitude"] if facility["geoLocation"] is not None else None,
        "longitude": facility["geoLocation"]["longitude"] if facility["geoLocation"] is not None else None,
        "facilityType": get_facility_type(facility),
        "city": facility["city"] if "city" in facility else None,
        "province": facility["province"] if "province" in facility else None,
        "region": get_region_name(facility),
        "country_code": facility["country_code"] if "country_code" in facility else None,
        "usage": get_usage(facility["staticData"])
    }
    # Add the mark field, based on some other fields
    fields["mark"] = get_mark(fields["facilityType"], fields["longitude"],
            fields["latitude"], facility["staticData"])

    output_json.append({"model": "api.parkingdata", "pk": pk, "fields": fields})
    pk += 1

print("Write data to {}...".format(output_filename))
with open(output_filename, "w") as file:
    json.dump(output_json, file)
