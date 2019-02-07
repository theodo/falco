# First stage: build front app
FROM node:8.12 AS node


WORKDIR /code

COPY .src/frontend /code/
ENV NODE_PATH /code/src
RUN yarn
RUN yarn build


# Second stage: build base backend
FROM python:3.7

ENV DJANGO_SETTINGS_MODULE root.settings.prod
ENV PYTHONPATH /code
ENV CELERY_BROKER_URL sqs://

WORKDIR /code

RUN pip install pipenv gunicorn

COPY .src/backend /code/
COPY --from=node /code/build /code/front/static/front

RUN pipenv install --system --deploy

# Collect statics
RUN mkdir -p /var/log/falco
RUN touch /var/log/falco/django.log
RUN SECRET_KEY=itdoesntreallymatter LOG_PATH=/var/log/falco/django.log python ./manage.py collectstatic
