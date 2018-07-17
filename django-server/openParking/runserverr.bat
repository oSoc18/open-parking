@echo on
echo loading data
python manage.py migrate
python manage.py flush --noinput
python manage.py loaddata fixture
python manage.py runserver
pause
