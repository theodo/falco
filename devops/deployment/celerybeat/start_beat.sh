cd /code

celery -A root.celery beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler
