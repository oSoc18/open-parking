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


input_directory = argv[1]
output_filename = argv[2]

file_list = [f for f in listdir(input_directory)
             if isfile(join(input_directory, f))]

output_json = []

print("Loading data from {}...".format(input_directory))
pk = 1
for filename in file_list:
    facility = json.load(open(join(input_directory, filename)))
    output_json.append({
        "model": "api.parkingdata",
        "pk": pk,
        "fields": {
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
            "country_code": facility["country_code"] if "country_code" in facility else None
        }
    })
    print(pk)
    pk += 1

print("Write data to {}...".format(output_filename))
with open(output_filename, "w") as file:
    json.dump(output_json, file)
