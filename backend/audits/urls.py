from audits import views
from django.urls import path

app_name = "audits"

urlpatterns = [
    path("", views.request_audit),
    path("<uuid:audit_uuid>/status", views.audit_status),
    path("<uuid:audit_uuid>/results", views.audit_results),
    path("results", views.audits_results),
]
