# Create the required cache files and folders
mkdir cache-dir
if [ ! -f cache_list.json ]; then
	echo {\"cached\": []} > cache_list.json
fi

# Download all the static data in teh cache directory
echo python cache.py cache-dir/ cache_list.json data_index_1_3_fixed.json
python cache.py cache-dir/ cache_list.json data_index_1_3_fixed.json

# Compute the location of each facility, whenever possible
echo python find_location.py cache-dir/
python find_location.py cache-dir/

# Create the JSON fixture for the database
echo python create_fixture.py cache-dir/ ../django-server/openParking/api/fixtures/fixture.json
python create_fixture.py cache-dir/ ../django-server/openParking/api/fixtures/fixture.json
