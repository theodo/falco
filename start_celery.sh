cd /code

python /code/manage.py celery -B -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler -c 4
