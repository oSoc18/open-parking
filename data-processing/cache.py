"""
Sends a request to every static data link in the index file and stores the
result in a folder, in a file named after the UUID of the facility. It allows
to cache locally the static data, in order not to send requests every time.
It uses a small JSON file to keep track of which files have been cached so far,
which will be created if it does not exist.

Example:
    python cache.py cache-dir/ cache_list.json data_index_1_3_fixed.json

"""
import json
import requests
from sys import argv
from os.path import join

cache_dir = argv[1]
cache_list_filename = argv[2]
index_filename = argv[3]

index_json = json.load(open(index_filename))
try:
    cache_list = json.load(open(cache_list_filename))
except FileNotFoundError:
    cache_list = {"cached": []}

index_facilities = index_json["ParkingFacilities"]

for facility in index_facilities:
    try:
        # If we did not downloaded the data yet
        if facility["uuid"] not in cache_list["cached"]:
            print(len(cache_list["cached"]), "/", len(index_facilities))
            print("Requesting ", facility["staticDataUrl"])
            # Send the request
            result = requests.get(facility["staticDataUrl"])

            static_data = None
            if result.status_code == requests.codes.ok and "parkingFacilityInformation" in result.json():
                static_data = result.json()["parkingFacilityInformation"]

            # Write the result to the output file
            facility["staticData"] = static_data
            with open(join(cache_dir, facility["uuid"] + ".json"), "w") as file:
                json.dump(facility, file, indent=2)
            # Update the cache list
            cache_list["cached"].append(facility["uuid"])
            with open(cache_list_filename, "w") as file:
                json.dump(cache_list, file)
    # Stop on Ctrl+C (or Ctrl+Break) interrupt
    except KeyboardInterrupt:
        break
