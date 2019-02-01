cd /code

celery -A falco.celery worker -l INFO
