from core.models import BaseModel
from django.db import models


class Lead(BaseModel):
    email = models.EmailField("email address", blank=False, null=False)

    def __str__(self):
        return self.email
