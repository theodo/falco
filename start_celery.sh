cd /code

celery worker -B -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler -c 4
