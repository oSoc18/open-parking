# Open Parking

## To Install Dependencies
You'll need `python3` and `npm` installed. It is handy to set up a virtual
environment, with `virtualenv` for example. Once you have Python installed,
you can install Python libraries with
```
	pip3 install -r requirements.txt
```

## To Run the Development Server
```
	cd django-server/openParking # Go to the folder where manage.py lies
	python3 manage.py loaddata fixture # Load all index data
	python manage.py runserver # Run server
```

## To Update the Database (When the Model is Changed)
When a back-end guy does a change on the model, the SQL database needs to be
updated. Here is how:
```
	cd django-server/openParking # Go to the folder where manage.py lies
	python manage.py flush --noinput
	python manage.py migrate
	python manage.py loaddata fixture
```

## To Deploy
There is several steps to be followed in order to deploy the website.

### Deploy Frontend
```
    cd frontend/
	npm install # Make sure npm installed the dependencies
	npm run build
```

### Deploy Backend
Make sure that `django-server/openParking/openParking/settings.py` contains the
following settings (this should be the case on the `deployment` branch):
```py
    DEBUG = False
	ALLOWED_HOSTS = ["localhost", "openparking.nl"] # Add all you IP addresses and domain names

	# At the bottom of the file...
	STATIC_URL = '/static/'
	STATIC_ROOT = os.path.join(BASE_DIR, "static/")
```
And then run the following commands
```
    pip install -r requirements.txt # Make sure gunicorn is installed
    cd django-server/openParking/

	# Make sure the database is up to date
	python3 manage.py migrate
	python3 manage.py flush --noinput
	python3 manage.py loaddata fixture

	# Copy the static file to the static file folder, ready to be served
	python3 manage.py collectstatic
    gunicorn --bind <your socket, such as localhost:8080 or so> --workers 3 openParking.wsgi:application
```
