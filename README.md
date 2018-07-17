# open-parking

## To install dependencies

```
	pip install -r requirements.txt
```

## To run the server
```
	cd django-server/openParking # Go to the folder where manage.py lies
	python manage.py loaddata fixture # Load all index data
	python manage.py runserver # Run server
```

## To update the database (when the model is changed)
When a back-end guy does a change on the model, the SQL database needs to be
updated. Here is how:
```
	cd django-server/openParking # Go to the folder where manage.py lies
	python manage.py flush --noinput
	python manage.py migrate
	python manage.py loaddata fixture
```
