FROM falco/base

COPY ./celery_worker/start.sh /code/
CMD ["celery", "-A Falco.celery worker -l INFO"]
