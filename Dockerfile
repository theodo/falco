# First stage: build front app
FROM node:8.12-alpine AS node

WORKDIR /code

COPY ./frontend/package.json ./frontend/yarn.lock /code/
RUN yarn install --pure-lockfile

COPY ./frontend/ /code/
RUN yarn build

# Second stage: build base backend
FROM python:3.7-alpine AS backend

# Allow heroku exec
RUN apk add --no-cache curl postgresql-dev openssh bash


ADD ./.profile.d /app/.profile.d
ADD ./sh-wrapper.sh /bin/sh-wrapper.sh
COPY ./*.sh /code/

RUN chmod a+x /app/.profile.d/heroku-exec.sh && \
  chmod a+x /bin/sh-wrapper.sh && \
  chmod a+x /code/*.sh && \
  rm /bin/sh && \
  ln -s /bin/sh-wrapper.sh /bin/sh

ENV DJANGO_SETTINGS_MODULE root.settings.prod
ENV PYTHONPATH /code
ENV PIP_NO_CACHE_DIR true

COPY --from=node /code/build /code/front/static/front

WORKDIR /code

RUN pip3 install --no-cache-dir pipenv gunicorn

COPY ./backend/Pipfile* /code/
RUN apk add --no-cache --virtual build-dependencies gcc musl-dev libffi-dev curl-dev openssl-dev libressl-dev && \
    pipenv install --system --deploy && \
    apk del build-dependencies

COPY ./backend /code/

# Collect statics
RUN mkdir -p /var/log/falco && \
 mkdir -p /code/static && \
 touch /var/log/falco/django.log && \
 SECRET_KEY=itdoesntreallymatter LOG_PATH=/dev/stdout python ./manage.py collectstatic --no-input