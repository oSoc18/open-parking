import json
from sys import argv

def get_value(object, keys):
    try:
        for key in keys:
            object = object[key]
        return object
    except (KeyError, IndexError) as e:
        return None

def geojson_to_geojson(object):
    return object

def coord_to_coord(coord):
    # Nothing to do here
    return coord

def address_to_coord(address):
    # Shoud use OSM nominatim here;
    return address

input_filename = argv[1]
output_filename = argv[2]

fields_to_try = [
    (["locationForDisplay"], coord_to_coord),
    (["accessPoints", 0, "accessPointLocation"], coord_to_coord),
    (["accessPoints", 0, "accessPointAddress"], address_to_coord),
    (["sellingPoints", 0, "sellingPointLocation"], coord_to_coord),
    (["specifications", 0, "areaGeometry"], geojson_to_geojson)
]
input_json = json.load(open(input_filename))
output_json = {"ParkingFacilities": []}

report = {
    "staticData": 0,
    "locationForDisplay": 0,
    "accessPointLocation": 0,
    "accessPointAddress": 0,
    "sellingPointLocation": 0,
    "areaGeometry": 0
}

for facility in input_json["ParkingFacilities"]:
    static_data = facility["staticData"]
    if static_data is None:
        continue
    report["staticData"] += 1

    foundLocation = False
    for field, convert_function in fields_to_try:
        try:
            value = get_value(static_data, field)
            if value is not None:
                if foundLocation is False:
                    facility["location"] = convert_function(value)
                foundLocation = True
                report[field[-1]] += 1
                print(facility)
        except Exception:
            continue

    output_json["ParkingFacilities"].append(facility)

for k, v in report.items():
    print("{}: {}/{}".format(k, v, len(input_json["ParkingFacilities"])))

with open(output_filename, "w") as file:
    json.dump(output_json, file, indent=2)
