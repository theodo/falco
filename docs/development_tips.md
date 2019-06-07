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

## How to import custom data from abackup file

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
