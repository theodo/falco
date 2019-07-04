# DEV tips

## How to add a package to Django

If you need to add a Django package in FALCO backend, please use folowing procedure:

- Go to `falco` directory

- Launch backend:

  ```sh
  make backend/start
  ```

- Once backend is completely up, install your package inside docker:

  ```sh
  docker exec -it falco_backend_1 pipenv install <package_name>==<package_version>
  ```

  _This will install your package, then update Pipfile and Pipfile.lock files accordingly._

- Once package is installed, stop backend using `Ctrl + C`

- To make your package installation persistent, you have to rebuild all Django containers:

  ```sh
  docker-compose build --no-cache backend

  docker-compose build --no-cache celeryworker

  docker-compose build --no-cache celerybeat
  ```

- Relaunch backend and ensure you have no error:
  ```sh
  make backend/start
  ```
- Enjoy! 🎉

## How to import custom data from a backup file

If you need to add a Django package in FALCO backend, please use folowing procedure:

- Go to `falco` directory

- Launch backend:

```sh
make backend/start
```

- Connect to local PostgreSQL server:

```bash
make db/connect
```

- If your script does not include it, for each table _<table_name>_ that you will update within public schema, delete all data stored in it:

```sql
TRUNCATE TABLE <table_name> CASCADE;
```

- Close connection to local PostgreSQL server:

```sql
\q
```

- Import data from backup file:

```bash
docker exec -i falco_db_1 psql -Upostgres < backup_file.sql
```

- Attribute all the projects to the superusers and set all the wpt_api_keys

```bash
docker-compose exec backend ./manage.py attributeprojectstoadmins --key <your_key>
```

## Validation using Postman
Postman is a very useful tool in order to test and validate the API.

### Configure an environment
An environment allows you to store sensitive and repetitive information locally and still be able to share your collections with you team.

Click on the eye icon in the top right of the Postman interface and create a new environment (e.g. 'Falco Staging').
Define as variables:
- `token` : the access token that you can copy from the localstorage
- `endpoint` : the api endpoint (e.g. `staging.getfal.co/api`)

### Create a collection
A collection is a set of requests. It can be very useful in order to speed up the validation of tickets.

In the top left of the interface, click on 'create' the 'new collection'
**Important** In the 'Authorization' tab, Choose in the dropdown menu the 'Bearer Token' option and set `{{token}}` in the 'Token' field. Postman will then use the environment variable to populate the collection field

### Create a request
Do not forget to save the request in the collection and check in the 'Authorization' tab of the request that the authorization type is 'Inherit from parent'

## Solving the Celery Beat `ERROR: Pidfile (celerybeat.pid) already exists.` error

If you encounter this error (whether after a `make backend/start` or `docker-compose restart celerybeat`), run the following command to fix it:

```
rm backend/celerybreat.pid
```
