# First stage: build front app
FROM node:8.12-alpine AS node

WORKDIR /code

COPY ./frontend/package.json ./frontend/yarn.lock /code/
RUN yarn install --pure-lockfile --ignore-scripts

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

RUN pip3 install --no-cache-dir pipenv gunicorn

WORKDIR /code

COPY ./backend/Pipfile* /code/
RUN apk add --no-cache --virtual build-dependencies gcc musl-dev libffi-dev curl-dev openssl-dev libressl-dev && \
    pipenv install --system --deploy && \
    apk del build-dependencies

RUN addgroup -S pythongroup && adduser -S pythonuser -G pythongroup --uid 2000
USER pythonuser

COPY --from=node /code/build /code/front/static/front

COPY ./backend /code/

# Collect statics
RUN mkdir -p /code/static && SECRET_KEY=notused python ./manage.py collectstatic --no-input
