from core.models import BaseModel
from django.db import models


class Project(BaseModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
