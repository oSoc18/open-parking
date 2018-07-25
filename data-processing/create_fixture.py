"""
Create a JSON file suitable to be loaded into the Django SQL database, from
data in the cache folder. Some of the fields are calculated here, such as the
facility type or the region name.

Example:
    python create_fixture.py cache-dir/ ../django-server/openParking/api/fixtures/fixture.json

"""

import json
from sys import argv
from os import listdir
from os.path import isfile, join
from find_location import get_value

def get_region_name(facility):
    """Return the region name of a facility, based on its province."""
    if "province" in facility and facility["province"] is not None:
        provinces = {
            ("Noord-Holland", "Utrecht", "Flevoland"): "Noordwest-Nederland",
            ("Zuid-Holland", "Zeeland"): "Zuidwest-Nederland",
            ("Noord-Brabant", "Limburg"): "Zuid-Nederland",
            ("Gelderland", "Overijssel"): "Oost-Nederland",
            ("Groningen", "Friesland", "Drenthe", "Fryslân"): "Noord-Nederland"
        }
        for province_list, region in provinces.items():
            if facility["province"] in province_list:
                return region
    return None


def is_not_none(value, key, is_array=False):
    """Checks whether a value is contained in the object, and that it is not None."""
    return value is not None and key in value and value[key] is not None and (not is_array or len(value[key]) > 0)


usage_name_mapping = {
    "Parkeren": "onstreet",
    "Stadsbrede vergunningen": "onstreet",
    "Bezoekers Parkeren": "onstreet",
    "Carpoolparkeren": "carpool",
    "VergunningParkeren": "onstreet",
    "Vergunningen Sector": "onstreet",
    "Bewonersparkeervergunning": "onstreet",
    "Parkeeervergunning voor hotelgasten": "onstreet",
    "Verblijfsrechten Milieuzone": "onstreet",
    "Bezoekersvergunningen": "onstreet",
    "Betaald parkeren": "onstreet",
    "Verblijfsrechten ontheffings gebieden": "onstreet",
    "Ontheffingen inrij en parkeren KWG": "onstreet",
    "Vergunning parkeren overig": "onstreet",
    "Betaald parkeren ondernemers": "onstreet",
    "Carpool Parkeren": "carpool",
    "Terrein Parkeren": "terrain",
    "Zakelijke parkeervergunning": "onstreet",
    "Vergunningen Bewoners Betaald-parkeergebied": "onstreet",
    "Betaald Parkeren": "onstreet",
    "Terrein parkeren": "terrain",
    "Zakelijke parkeervergunning Marktkooplieden": "onstreet",
    "Bedrijfsvergunningen": "onstreet",
    "Vergunningen Zakelijk": "onstreet",
    "Garage Parkeren": "garage",
    "Bedrijf": "onstreet",
    "Parkeergarage": "garage",
    "P+R-terreinen": "park and ride",
    "Bewoners en Bedrijfsvergunningen": "onstreet",
    "Vergunning parkeren Graafjanstraat": "onstreet",
    "Te ontziene voertuigen": "onstreet",
    "Vergunningparkeren": "onstreet",
    "Vergunning parkeren centrum": "onstreet",
    "vergunning parkeren algemeen": "onstreet",
    "Ontheffing betaalapparatuur plaatsen": "onstreet",
    "Bedrijfsvergunningen geldig van Ma t/mVr": "onstreet",
    "Vrij parkeren": "onstreet",
    "Garageparkeren": "garage",
    "Bewoners, bezoekers en bedrijfsvergunningen": "onstreet",
    "Carpool parkeren": "carpool",
    "Zorgparkeervergunning": "onstreet",
    "Vergunningen Gemeente Parkeren": "onstreet",
    "Parkeerkaarten": "onstreet",
    "Allround alle gebieden vergunningparkeren": "onstreet",
    "Blauwe Zone": "onstreet",
    "Ontheffingen inrij en niet parkeren KWG": "onstreet",
    "Garage parkeren": "garage",
    "Te signaleren voertuigen": "onstreet",
    "Marktvergunningen": "onstreet",
    "Blauwe zones": "onstreet",
    "Bewonersvergunningen": "onstreet",
    "BetaaldParkeren": "onstreet",
    "stadsbrede vergunningen": "onstreet",
    "Bewonersparkeren": "onstreet",
    "Vergunningen Lang Parkeren": "onstreet",
    "Electrisch opladen": "others",
    "Vergunning Parkeren": "onstreet",
    "CARPOOLPARKEREN": "carpool",
    "Tereinparkeren": "terrain",
    "Bezoekersparkeren": "onstreet",
    "Centrum dagvergunningen": "onstreet",
    "Vergunningen Lang-Kort Betaald-parkeergebied": "onstreet",
    "Werknemersparkeervergunning": "onstreet",
    "P en R terreinen": "park and ride",
    "Ontheffingen beperkte inrij KWG": "onstreet",
    "Autodeler": "onstreet",
    "Terreinparkeren": "terrain",
    "Bewoners Vergunningen": "onstreet",
    "Bezoekersregeling": "onstreet",
    "Carpool": "carpool",
    "Hulpdienst": "onstreet",
    "Vergunning Parkeren Bewoners (en Bedrijven)": "onstreet",
    "Parkeervergunningen die in de hele stad geldig zijn": "onstreet",
    "Park & Ride": "park and ride"
}

def get_usage(staticData):
    # Check the usage field
    if staticData is not None and is_not_none(staticData, "specifications", True):
        specs = staticData["specifications"][0]
        if is_not_none(specs, "usage"):
            return usage_name_mapping[specs["usage"]]

    # Check the geometry
    if is_not_none(facility["staticData"], "specifications", True) \
            and facility["staticData"]["specifications"][0] is not None \
            and "areaGeometry" in facility["staticData"]["specifications"][0] \
            and "coordinates" in facility["staticData"]["specifications"][0]["areaGeometry"]:
        return "onstreet"

    return None

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
            for field in ("tariffs", "contactPersons", "openingTimes"):
                if is_not_none(staticData, field, True):
                    numberFields += 1
            if is_not_none(staticData, "specifications", True):
                specs = staticData["specifications"][0]
                for field in ("capacity", "minimumHeightInMeters"):
                    if is_not_none(specs, field):
                        numberFields += 1
        if numberFields > 5:
            return "good"
        elif numberFields > 2:
            return "average"
        else:
            return "bad"

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
        "dynamicDataUrl": facility.get("dynamicDataUrl", None),
        "limitedAccess": facility["limitedAccess"],
        "latitude": facility["geoLocation"]["latitude"] if facility["geoLocation"] is not None else None,
        "longitude": facility["geoLocation"]["longitude"] if facility["geoLocation"] is not None else None,
        "city": facility["city"] if "city" in facility else None,
        "province": facility["province"] if "province" in facility else None,
        "region": get_region_name(facility),
        "country_code": facility["country_code"] if "country_code" in facility else None,
        "usage": get_usage(facility["staticData"]),
        "accessPoints": is_not_none(facility["staticData"], "accessPoints", True),
        "capacity": get_value(facility, ["staticData", "specifications", 0, "capacity"]),
        "tariffs": is_not_none(facility["staticData"], "tariffs", True),
        "minimumHeightInMeters": get_value(facility, ["staticData", "specifications", 0, "minimumHeightInMeters"]),
        "openingTimes": is_not_none(facility["staticData"], "openingTimes", True),
        "contactPersons": is_not_none(facility["staticData"], "contactPersons", True)
    }
    # Add the mark field, based on some other fields
    fields["mark"] = get_mark(fields["usage"], fields["longitude"],
                              fields["latitude"], facility["staticData"])

    output_json.append({"model": "api.parkingdata",
                        "pk": pk, "fields": fields})
    pk += 1

output_json.append({"model": "api.parkingdata", "pk": pk, "fields": {
    "name": "Oy mate, what are you doing here?",
    "uuid": "abcdef",
    "staticDataUrl": "www.google.com",
    "dynamicDataUrl": "maps.google.com",
    "limitedAccess": True,
    "latitude": -27.116667,
    "longitude": -109.366667,
    "city": "Somewhere",
    "province": "Lost",
    "region": "In the Pacific",
    "country_code": "m8",
    "usage": "garage",
    "accessPoints": True,
    "capacity": 42,
    "tariffs": True,
    "minimumHeightInMeters": 3.1415,
    "openingTimes": True,
    "contactPersons": True
}})

print("Write data to {}...".format(output_filename))
with open(output_filename, "w") as file:
    json.dump(output_json, file)
