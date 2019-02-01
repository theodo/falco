# flake8: noqa
from .base import *

SECRET_KEY = "f0de227df9c0c14f1d4d07bbf878846de538fc21cf3150bf14"
DEBUG = True
INTERNAL_IPS = ["127.0.0.1", "172.16.253.1"]

INSTALLED_APPS = INSTALLED_APPS + ["debug_toolbar", "django_extensions"]

MIDDLEWARE = MIDDLEWARE + ["debug_toolbar.middleware.DebugToolbarMiddleware"]

# Uploaded files storage
MEDIA_ROOT = "/uploads/"
MEDIA_URL_PATH = "uploads/"
MEDIA_URL = "http://localhost:8000/" + MEDIA_URL_PATH

# Caching
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.filebased.FileBasedCache",
        "LOCATION": "/var/tmp/django_cache",
    }
}

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: request.META["SERVER_NAME"] != "testserver"
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
