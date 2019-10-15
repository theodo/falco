from django.urls import path
from projects import views

app_name = "projects"

urlpatterns = [
    path("", views.project_list),
    path("first", views.first_project),
    path("<uuid:project_uuid>/", views.project_detail),
    path("<uuid:project_uuid>/members", views.project_members),
    path("<uuid:project_uuid>/members/<int:user_id>", views.project_member_detail),
    path("<uuid:project_uuid>/pages", views.project_page_list),
    path("<uuid:project_uuid>/audit_parameters", views.project_audit_parameter_list),
    path("<uuid:project_uuid>/pages/<uuid:page_uuid>", views.project_page_detail),
    path(
        "<uuid:project_uuid>/audit_parameters/<uuid:audit_parameters_uuid>",
        views.project_audit_parameters_detail,
    ),
    path("available_audit_parameters", views.available_audit_parameters),
    path("<uuid:project_uuid>/scripts", views.project_scripts),
]
