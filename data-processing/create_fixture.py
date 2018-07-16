import json
from sys import argv
from os import listdir
from os.path import isfile, join

def get_facility_type(facility):
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
    if "province" in facility and facility["province"] is not None:
        if facility["province"] in ("Noord-Holland", "Utrecht", "Flavoland"):
            return "Noordwest-Nederland"
        elif facility["province"] in ("Zuid-Holland", "Zeeland"):
            return "Zuidwest-Nederland"
        elif facility["province"] in ("Noord-Brabant", "Limburg"):
            return "Zuid-Nederland"
        elif facility["province"] in ("Gelderland", "Overijsel"):
            return "Oost-Nederland"
        elif facility["province"] in ("Groningen", "Friesland"):
            return "Noord-Nederland"
        else:
            return None
    else:
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
    pk += 1

print("Write data to {}...".format(output_filename))
with open(output_filename, "w") as file:
    json.dump(output_json, file)
