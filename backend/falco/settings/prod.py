# flake8: noqa
import os

import requests

from .base import *

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = False

ALLOWED_HOSTS = [
    # Change me!
    "getfal.co"
]

if "ALLOWED_HOST" in os.environ:
    ALLOWED_HOSTS.append(os.environ.get("ALLOWED_HOST"))

try:
    EC2_IP = requests.get("http://169.254.169.254/latest/meta-data/local-ipv4").text
    ALLOWED_HOSTS.append(EC2_IP)
except requests.exceptions.RequestException:
    pass

INSTALLED_APPS = INSTALLED_APPS + ["storages"]

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

# Static files
STATICFILES_STORAGE = "core.storage.ManifestStorage"

# Celery configuration

CELERY_BROKER_TRANSPORT_OPTIONS = {"region": "eu-west-3"}
CELERY_TASK_DEFAULT_QUEUE = os.environ.get("CELERY_TASK_DEFAULT_QUEUE", "celery")
