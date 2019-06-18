from core.models import BaseModel
from django.db import models


class WhatsNew(BaseModel):
    last_update_newsletter = models.DateField()

    def __str__(self):
        return str(self.last_update_newsletter)
