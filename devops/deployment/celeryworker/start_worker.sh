cd /code

celery -A root.celery worker -l INFO
