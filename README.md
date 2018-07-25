# open-parking

## Backend
### To install dependencies

```
	pip3 install -r requirements.txt
```

### To run the server
```
	cd django-server/openParking # Go to the folder where manage.py lies
	python3 manage.py loaddata fixture # Load all index data
	python manage.py runserver # Run server
```

### To update the database (when the model is changed)
When a back-end guy does a change on the model, the SQL database needs to be
updated. Here is how:
```
	cd django-server/openParking # Go to the folder where manage.py lies
	python manage.py flush --noinput
	python manage.py migrate
	python manage.py loaddata fixture
```
## Frontend
### Make sure you have the latest versions of Node.JS and NPM installed
### Install dependencies (in the folder "frontend")
``` 
	npm install
```

### To run development server 
``` 
	npm start # also in the frontend folder
```
