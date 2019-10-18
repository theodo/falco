# flake8: noqa

import os
import django_heroku
import requests

from .base import *

SECRET_KEY = os.environ.get("SECRET_KEY")
FERNET_KEYS = [os.environ.get("DB_CYPHER_KEY")]
DEBUG = False

if "ALLOWED_HOST" in os.environ:
    ALLOWED_HOSTS.append(os.environ.get("ALLOWED_HOST"))

INSTALLED_APPS = INSTALLED_APPS + ["django.contrib.staticfiles"]

# Secure connection
SECURE_REDIRECT_EXEMPT = [r"/?health"]

# Uploaded files storage
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_STORAGE_BUCKET_NAME = os.environ.get("MEDIA_BUCKET")
AWS_DEFAULT_ACL = "private"
AWS_S3_REGION_NAME = "eu-west-3"
AWS_S3_SIGNATURE_VERSION = "s3v4"

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": os.environ.get("LOG_PATH"),
        }
    },
    "loggers": {"django": {"handlers": ["file"]}},
}

# Caching
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "application_cache",
    }
}

# Celery configuration

CELERY_BROKER_TRANSPORT_OPTIONS = {"region": "eu-west-3"}
CELERY_TASK_DEFAULT_QUEUE = os.environ.get("CELERY_TASK_DEFAULT_QUEUE", "celery")

# SSL Configuration

# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
# SECURE_SSL_REDIRECT = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
# SECURE_HSTS_PRELOAD = True
# SECURE_HSTS_SECONDS = 31536000
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True

# SECURE_BROWSER_XSS_FILTER = True
# SECURE_CONTENT_TYPE_NOSNIFF = True

# Email settings
# https://docs.djangoproject.com/en/2.2/topics/email/

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_USE_TLS = True
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_HOST_USER = os.environ.get("EMAIL_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_PASSWORD")
port = os.environ.get("EMAIL_PORT")
EMAIL_PORT = int(port) if port is not None else 0

# RefreshToken JWT
"""
    STORE_REFRESH_TOKEN_COOKIE_ONLY_IN_HTTPS parameter indicates if refreshToken cookie received from ResponseHeader
    must be stored locally (and so used as RequestHeader for following requests) if it has been received through
    an unsecured connection (over HTTP and not HTTPS).
    In PROD environment, we want to secure this sensitive data and enforce this parameter to be set to True.
"""
STORE_REFRESH_TOKEN_COOKIE_ONLY_IN_HTTPS = True

# Google Analytics
GOOGLE_ANALYTICS_ID = os.environ.get("GOOGLE_ANALYTICS_ID")

# Place static in the same location as webpack build files
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = ["/code/front/static/front", "/code/static"]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Configure app for Heroku deployment
django_heroku.settings(locals())
