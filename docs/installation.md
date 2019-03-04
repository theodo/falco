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
- Check that you have the right dependencies installed:
  ```bash
  make check-dependencies
  ```
- Install the backend:
  ```bash
  make backend/install
  ```
- Copy the WebPageTest API Key in the .env at the root of your project
- Install the frontend:
  ```bash
  make frontend/install
  ```
- Create an admin account:
  ```bash
  make createsuperuser:
  ```

## Start the app

What you need to do to (re)start the project:

- Start the backend:
  ```bash
  make backend/start
  ```
- Start the frontend:

  ```bash
  make frontend/start
  ```

  The project should now be running at [localhost:8000](http://localhost:8000).
