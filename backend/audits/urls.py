from audits import views
from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "audits"

urlpatterns = [
    path("<uuid:audit_uuid>/status", views.audit_status),
    path("<uuid:audit_uuid>/results", views.audit_results),
]
