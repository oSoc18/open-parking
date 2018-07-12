import json
from sys import argv
from os import listdir
from os.path import isfile, join
import requests
from time import time, sleep
from shapely.geometry import shape

def get_value(object, keys):
    try:
        for key in keys:
            object = object[key]
        return object
    except (KeyError, IndexError, TypeError):
        return None

def get_address_fields(facility):
    country_code = None
    city = None
    province = None
    if "geoLocation" in facility and facility["geoLocation"] is not None:
        print(facility["uuid"])
        # Make sure not to make more than one request per second or so
        if get_address_fields.last_request is None:
            get_address_fields.last_request = time()
        delay_between_requests = 1.1
        now = time()
        time_to_wait = delay_between_requests - (now - get_address_fields.last_request)
        if time_to_wait > 0:
            sleep(time_to_wait)
        get_address_fields.last_request = now

        request = "https://nominatim.openstreetmap.org/reverse?format=json&lat={}&lon={}".format(
                facility["geoLocation"]["latitude"], facility["geoLocation"]["longitude"])
        print(request)
        result = requests.get(request)
        if result.status_code == requests.codes.ok:
            result = result.json()
            if "address" in result:
                country_code = result["address"]["country_code"]
                if "city" in result["address"]:
                    city = result["address"]["city"]
                elif "city" in result["address"]:
                    city = result["address"]["town"]
                elif "suburb" in result["address"]:
                    city = result["address"]["suburb"]
                province = result["address"]["state"]

    return {
        "country_code": country_code,
        "city": city,
        "province": province
    }

get_address_fields.last_request = None

def coord_to_coord(object):
    if isinstance(object, list):
        object = object[0]
    if object is not None and (abs(object["latitude"]) > 90 or abs(object["longitude"]) > 180):
        lat = str(object["latitude"])
        lat = float(lat[:2] + "." + lat[2:-2])
        lon = str(object["longitude"])
        lon = float(lon[:1] + "." + lon[1:-2])
        print("Invalid coordinates:", object)
        object["latitude"] = input("Correct latitude ? " + str(lat) + " ")
        object["longitude"] = input("Correct longitude ? " + str(lon) + " ")
        object["longitude"] = lon if object["longitude"] == "" else float(object["longitude"])
        object["latitude"] = lat if object["latitude"] == "" else float(object["latitude"])
    return object

def shape_to_coord(object):
    try:
        geodata = shape(object).centroid
        if geodata.is_empty:
            return None
        else:
            return {"longitude": geodata.x, "latitude": geodata.y}
    except:
        return None

def address_to_coord(address):
    # Use nominatim to translate from address to geolocation
    # Make sure not to make more than one request per second or so
    if address_to_coord.last_request is None:
        address_to_coord.last_request = time()
    delay_between_requests = 1.1
    now = time()
    time_to_wait = delay_between_requests - (now - address_to_coord.last_request)
    if time_to_wait > 0:
        sleep(time_to_wait)
    address_to_coord.last_request = now

    try:
        request = "https://nominatim.openstreetmap.org/search?limit=1&format=json" + \
            "&q={}, {}, {}".format(
            (address["houseNumber"] + " " + address["streetName"] if "houseNumber" in address else address["streetName"]),
            address["city"], address["country"])
    except KeyError as e:
        return None



    print("Requesting", request)
    result = requests.get(request)

    if result.status_code == requests.codes.ok:
        result = result.json()
        if len(result) > 0:
            return {"latitude": result[0]["lat"],
                    "longitude": result[0]["lon"]}
    return None

address_to_coord.last_request = None

directory = argv[1]

fields_to_try = [
    (["locationForDisplay"], coord_to_coord),
    (["accessPoints", 0, "accessPointLocation"], coord_to_coord),
    (["accessPoints", 0, "accessPointAddress"], address_to_coord),
    (["sellingPoints", 0, "sellingPointLocation"], coord_to_coord),
    (["specifications", 0, "areaGeometry"], shape_to_coord),
]

file_list = [join(directory, f) for f in listdir(directory) if isfile(join(directory, f))]

for filename in file_list:
    try:
        facility  = json.load(open(filename))
    except json.decoder.JSONDecodeError as e:
        print(e)
        print(filename)

    if "geoLocation" not in facility:
        static_data = facility["staticData"]
        if static_data is None:
            continue

        facility["geoLocation"] = None
        for field, convert_function in fields_to_try:
            value = get_value(static_data, field)
            if value is not None:
                facility["geoLocation"] = convert_function(value)
                break

        with open(filename, "w") as file:
            json.dump(facility, file, indent=2)

    if "city" not in facility and facility["geoLocation"] is not None:
        facility.update(get_address_fields(facility))
        with open(filename, "w") as file:
            json.dump(facility, file, indent=2)
