# Contributing to Falco

You are here to help on Falco? Awesome, feel welcome and read the following sections in order to know how to ask questions and how to work on something.

All members of our community are expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Please make sure you are welcoming and friendly in all of our spaces.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests or writing code which can be incorporated into Falco itself.

## Improving the docs

The Falco docs are stored in the `docs/` folder in this very repository. The actual documentation is written in [GitHub Flavoured Markdown](https://github.github.com/gfm/) in individual files in the `docs/docs/` subfolder. You can edit individual files right inside the GitHub editor, which does not require any local setup.

To edit a piece of documentation, you can click on the “Edit this page” link in the docs you would like to update:

![Edit this doc button](/docs/static/img/edit-docs.png)

## Local development on Falco

This section will guide you through installing Falco on your development machine, so that you can work on your feature or bug fix locally before submitting a PR.

### First installation

**Prerequisites**:

- `node >=12.14` — It should work fine on older versions, however it was not tested recently. You can use [`nvm`](https://github.com/nvm-sh/nvm) to install and manage node versions on your machine.
- `docker` ([installation docs](https://docs.docker.com/install/)).

**Install steps**:

- Clone the repository:
  ```bash
  git clone git@github.com:theodo/falco.git
  ```
- Move to the `falco` directory:
  ```bash
  cd falco
  ```
- Install the backend and the frontend:
  ```bash
  make install
  ```
- Start the backend:
  ```bash
  make backend/start
  ```
- Populate the database with fixtures:
  ```bash
  make fixtures/load
  ```
- Edit the .env file: replace the initial SECRET_KEY with a random string

### To (re)start the app

- Start the backend:
  ```bash
  make backend/start
  ```
- Start the frontend:

  ```bash
  make frontend/start
  ```

The project should now be running at [localhost:3000](http://localhost:3000). You can access to the Django administration interface at [http://localhost:8000/admin/](http://localhost:8000/admin/).

To access both these interfaces, you can login using the following credentials:

- username: `admin`
- password: `admin`