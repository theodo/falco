cd /code

# SECRET_KEY=itdoesntreallymatter LOG_PATH=/var/log/falco/django.log python ./manage.py collectstatic

# Migrate
SECRET_KEY=itdoesntreallymatter python ./manage.py migrate --noinput

# Create cache table
SECRET_KEY=itdoesntreallymatter python ./manage.py createcachetable


