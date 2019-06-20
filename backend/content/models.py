from core.models import BaseModel
from django.db import models


class WhatsNew(BaseModel):
    """
    This model represent the date when the last newsletter was posted
    """

    last_update_newsletter = models.DateTimeField()

    def __str__(self):
        return str(self.last_update_newsletter)
