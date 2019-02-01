cd /code

# Migrate
python ./manage.py migrate --noinput

# Create cache table
python ./manage.py createcachetable

gunicorn --bind 0.0.0.0:80 --chdir /code --workers 2 --access-logfile /var/log/falco/gunicorn-access.log --error-logfile /var/log/falco/gunicorn-error.log falco.wsgi:application
