cd /code

celery worker -A root.celery -B -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler -c 4
