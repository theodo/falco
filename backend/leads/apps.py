from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class LeadsConfig(AppConfig):
    name = "leads"
    verbose_name = _("Leads")
