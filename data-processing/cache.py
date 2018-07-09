import json
import requests
from sys import argv
from os.path import join

cache_dir = argv[1]
cache_list_filename = argv[2]
index_filename = argv[3]

index_json = json.load(open(index_filename))
cache_list = json.load(open(cache_list_filename))

index_facilities = index_json["ParkingFacilities"]

for facility in index_facilities:
    try:
        if facility["uuid"] not in cache_list["cached"]:
            print(len(cache_list["cached"]), "/", len(index_facilities))
            print("Requesting ", facility["staticDataUrl"])
            result = requests.get(facility["staticDataUrl"])

            static_data = None
            if result.status_code == requests.codes.ok and "parkingFacilityInformation" in result.json():
                static_data = result.json()["parkingFacilityInformation"]

            facility["staticData"] = static_data
            with open(join(cache_dir, facility["uuid"] + ".json"), "w") as file:
                json.dump(facility, file, indent=2)
            cache_list["cached"].append(facility["uuid"])
    except KeyboardInterrupt:
        break

with open(cache_list_filename, "w") as file:
    json.dump(cache_list, file)
