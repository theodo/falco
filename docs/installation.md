# Installation

In development:

- Django listens on the port 8000
  - it serves the HTML of your frontend app, which contains `<script>` tag pointing to webpack-dev-server
- webpack-dev-server listens on the port 3000
  - it serves your frontend app's bundle.js
  - it manages hot reloading

> In development, use localhost:8000. Your application will be served by Django, just like in production. You'll also have the Django debug toolbar and it doesn't impede hot-reload

## First setup

Go through this once when you install the project, you shouldn't need to do that again.

- Create a WebPageTest API Key on the following page: https://www.webpagetest.org/getkey.php
- Create a `.env` file at the root of the project, containing the following keys:
  - `DJANGO_SETTINGS_MODULE=root.settings.dev`
  - `CELERY_BROKER_URL=sqs://foo:bar@localstack:4576`
  - `SECRET_KEY=doesntreallymatter`
  - `WEBPAGETEST_API_KEY=<your WPT API key>`
- start the backend:
  ```bash
  TMPDIR=/private$TMPDIR docker-compose up
  ```
- setup the development database:
  ```bash
  # Migrate
  docker-compose exec backend ./manage.py migrate
  # Create cache table
  docker-compose exec backend ./manage.py createcachetable
  # Create an admin account
  docker-compose exec backend ./manage.py createsuperuser
  ```

## Start the app

What you need to do to (re)start the project:

- start the backend:
  ```bash
  TMPDIR=/private$TMPDIR docker-compose up
  ```
- start the frontend:

  ```bash
  cd frontend
  yarn install
  yarn start
  ```

  The project should now be running at [localhost:8000](http://localhost:8000).
