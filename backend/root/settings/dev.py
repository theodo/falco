# flake8: noqa
import sys

from .base import *

SECRET_KEY = os.environ.get("SECRET_KEY")
FERNET_KEYS = [os.environ.get("DB_CYPHER_KEY")]
DEBUG = True
INTERNAL_IPS = ["127.0.0.1", "172.16.210.1"]

INSTALLED_APPS = INSTALLED_APPS + ["django_extensions", "corsheaders"]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True

MIDDLEWARE = MIDDLEWARE + ["corsheaders.middleware.CorsMiddleware"]

# # Static files
# STATICFILES_STORAGE = "core.storage.ManifestStorage"

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

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler", "stream": sys.stdout}},
    "root": {"handlers": ["console"], "level": "INFO"},
}

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: request.META["SERVER_NAME"] != "testserver"
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# RefreshToken JWT
"""
    STORE_REFRESH_TOKEN_COOKIE_ONLY_IN_HTTPS parameter indicates if refreshToken cookie received from ResponseHeader
    must be stored locally (and so used as RequestHeader for following requests) if it has been received through
    an unsecured connection (over HTTP and not HTTPS).
    In DEV environment, as our server has no SSL certificate and does not handle HTTPS, we have to force this parameter
    to False.
"""
STORE_REFRESH_TOKEN_COOKIE_ONLY_IN_HTTPS = False
