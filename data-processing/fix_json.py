"""
Corrects errors in the index file, such as missing quotes or duplicate keys.
"""

from sys import argv
import json

input_filename = argv[1]
output_filename = argv[2]
lines = None
with open(input_filename) as file:
    lines = file.readlines()

res = ""
for i, line in enumerate(lines):
    line = line.rstrip()
    for key in ("name", "uuid", "staticDataUrl", "dynamicDataUrl"):
        if line.strip().startswith('"' + key + '"'):
            # Check that the string does not miss any quotes or comma
            comma = "," if not lines[i+1].strip().startswith("}") else ""
            if line[-1] != ",":
                line = line + comma
            if line[-2] != '"':
                line = line[:-1] + '"' + comma

            # Also check for the quote just after the colon
            colon = line.find(":")
            if colon != -1:
                i = 1
                while line[colon + i].isspace():
                    i += 1
                if line[colon + i] != '"':
                    line = line[:colon] + ':' + line[colon + 1:colon + i] + '"' + line[colon + i:]
            break
    res += line + "\n"


def dict_check_duplicates(ordered_pairs):
    """Prints out duplicate keys and returns a dict with the first of the duplicates."""
    # Search for duplicate keys
    duplicates = {key:[] for key, value in ordered_pairs}
    for key, value in ordered_pairs:
        duplicates[key].append(value)
    for key in duplicates:
        if len(duplicates[key]) > 1:
            print("Duplicate on key {} for facility named {}:".format(key, duplicates["name"]))
            for value in duplicates[key]:
                print("\t", value)
    # Keep the first value only
    return {k:duplicates[k][0] for k in duplicates}

json_file = json.loads(res, object_pairs_hook=dict_check_duplicates)
with open(output_filename, "w") as file:
    json.dump(json_file, file, indent=2)
