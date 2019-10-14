# First stage: build front app
FROM node:8.12-alpine AS node

WORKDIR /code

ENV NODE_PATH /code/src
COPY ./frontend /code/
RUN yarn && yarn build


# Second stage: build base backend
FROM python:3.7-alpine AS backend

RUN apk add --no-cache vim curl openssh-server postgresql-dev  gcc python3-dev musl-dev libffi-dev openssl-dev libressl-dev curl-dev bash

ADD ./.profile.d /app/.profile.d

RUN chmod a+x /app/.profile.d/heroku-exec.sh

ENV DJANGO_SETTINGS_MODULE root.settings.prod
ENV PYTHONPATH /code
ENV CELERY_BROKER_URL sqs://

COPY --from=node /code/build /code/front/static/front

WORKDIR /code

RUN pip3 install --no-cache-dir pipenv gunicorn

COPY ./backend/Pipfile* /code/
RUN pipenv install --system --deploy

COPY ./backend /code/

# Collect statics
ENV STATIC_ROOT=/code/staticfiles

RUN mkdir -p /var/log/falco && \
 mkdir -p /code/static && \
 mkdir -p /code/staticfiles && \
 touch /var/log/falco/django.log && \
 SECRET_KEY=itdoesntreallymatter LOG_PATH=/dev/stdout python ./manage.py collectstatic --no-input && \
 cp -R /code/staticfiles/* /code/static
