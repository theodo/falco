from core.models import BaseModel
from django.db import models


class Project(BaseModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Page(BaseModel):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=500)
    project = models.ForeignKey(Project, related_name="pages", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)
