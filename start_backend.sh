cd /code

gunicorn --bind 0.0.0.0:${PORT} --chdir /code --workers 2 --access-logfile - --error-logfile - -c root/gunicorn.py root.wsgi:application
