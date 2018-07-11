from sys import argv
import json

input_filename = argv[1]
output_filename = argv[2]
max_count = 10
required_fields = {"staticDataUrl": 0, "dynamicDataUrl": 0, "geoLocation": 0}
json_index = json.load(open(input_filename))
res_json = {"ParkingFacilities": []}
for facility in json_index["ParkingFacilities"]:
    for field in required_fields:
        if field in facility and required_fields[field] < max_count:
            res_json["ParkingFacilities"].append(facility)
            required_fields[field] += 1

with open(output_filename, "w") as file:
    json.dump(res_json, file, indent=2)
