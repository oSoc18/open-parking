import json
from sys import argv
from os import listdir
from os.path import isfile, join

input_directory = argv[1]
output_filename = argv[2]

file_list = [f for f in listdir(input_directory) if isfile(join(input_directory, f))]

output_json = []

print("Loading data from {}...".format(input_directory))
pk = 1
for filename in file_list:
    facility  = json.load(open(join(input_directory, filename)))
    output_json.append({
        "model": "api.parkingdata",
        "pk": pk,
        "fields": {
            "name": facility["name"],
            "uuid": facility["uuid"],
            "staticDataUrl": facility["staticDataUrl"],
            "dynamicDataUrl": facility.get("dynamicDataUrl", None),
            "limitedAccess": facility["limitedAccess"],
            "latitude": facility["geoLocation"]["latitude"] if facility["geoLocation"] is not None else None,
            "longitude": facility["geoLocation"]["longitude"] if facility["geoLocation"] is not None else None
        }
    })
    pk += 1

print("Write data to {}...".format(output_filename))
with open(output_filename, "w") as file:
    json.dump(output_json, file)