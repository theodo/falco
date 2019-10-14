cd /code

# Migrate
SECRET_KEY=itdoesntreallymatter python ./manage.py migrate --noinput

# Create cache table
SECRET_KEY=itdoesntreallymatter python ./manage.py createcachetable
