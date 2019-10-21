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

- Clone FALCO repository:
  ```bash
  git clone git@github.com:theodo/falco.git
  ```
- Move to `falco` subdirectory:
  ```bash
  cd falco
  ```
- Install the backend and the frontend:
  ```bash
  make install
  ```
- Ensure backend is started:
  ```bash
  make backend/start
  ```
- Create an admin account:
  ```bash
  make backend/createsuperuser
  ```
- Populate the database with fixtures:
  ```bash
  make fixtures/load
  ```
- Edit the .env file: replace the initial SECRET_KEY with a random string

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

The project should now be running at [localhost:3000](http://localhost:3000). You can acces to the Django administration interface at [http://localhost:8000/admin/](http://localhost:8000/admin/).

To access both these interfaces, you can login using the following credentials:

- username: `admin`
- password: `admin`
