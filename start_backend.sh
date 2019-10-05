cd /code

gunicorn --bind 0.0.0.0:${PORT} --chdir /code --workers 2 --access-logfile /var/log/falco/gunicorn-access.log --error-logfile /var/log/falco/gunicorn-error.log -c root/gunicorn.py root.wsgi:application
