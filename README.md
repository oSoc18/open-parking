# Open Parking

## To Install Dependencies
You'll need `python3` installed. It is handy to set up a virtual
environment, with `virtualenv` for example.
Also, make sure you have the latest versions of Node.JS and NPM installed.
Once you have everything installed,
you can install dependencies libraries with
```bash
pip3 install -r requirements.txt # Install backend dependencies
cd frontend/
npm install # Install frontend dependencies
```

## To Load the Data into the Development Server
```bash
cd django-server/openParking
python3 manage.py migrate # Update the database schema
python3 manage.py loaddata fixture # Load all index data
cd ../../frontend
```

## To Run the Development Server
For the backend server
```bash
cd django-server/openParking
python manage.py runserver
```
For the frontend
```bash
cd frontend/
npm start
```

## To Update the Database (When the Model is Changed)
When a back-end guy does a change on the model, the SQL database needs to be
updated. Here is how:
```bash
cd django-server/openParking
python manage.py flush --noinput
python manage.py migrate
python manage.py loaddata fixture
```

## To Deploy
There is several steps to be followed in order to deploy the website.

### Deploy Frontend
```bash
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
```bash
cd django-server/openParking/

# Make sure the database is up to date
python3 manage.py migrate
python3 manage.py flush --noinput
python3 manage.py loaddata fixture

# Copy the static file to the static file folder, ready to be served
python3 manage.py collectstatic
gunicorn --bind <your socket, such as localhost:8080 or so> --workers 3 openParking.wsgi:application
```
