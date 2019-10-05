cd /code

SECRET_KEY=itdoesntreallymatter LOG_PATH=/var/log/falco/django.log python ./manage.py collectstatic

# Migrate
python ./manage.py migrate --noinput

# Create cache table
python ./manage.py createcachetable


