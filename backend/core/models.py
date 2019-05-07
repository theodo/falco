import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class BaseModel(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        get_latest_by = "created_at"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.__class__.__name__.lower()}:{str(self.uuid)[:6]}"


class User(AbstractUser):
    first_name = models.CharField("first name", blank=False, null=False, max_length=30)
    last_name = models.CharField("last name", blank=False, null=False, max_length=150)
    email = models.EmailField("email address", blank=False, null=False)
