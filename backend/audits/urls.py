from audits import views
from django.urls import path

app_name = "audits"

urlpatterns = [
    path("<uuid:audit_uuid>/status", views.audit_status),
    path("<uuid:audit_uuid>/results", views.audit_results),
]
