@echo on
echo loading data
python manage.py loaddata fixture
python manage.py runserver
pause