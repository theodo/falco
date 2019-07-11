from django.urls import path
from projects import views

app_name = "projects"

urlpatterns = [
    path("", views.project_list),
    path("first", views.first_project),
    path("<uuid:project_uuid>/", views.project_detail),
    # temporarily disabled, will be used for pages creation from the app
    # path("<uuid:project_uuid>/pages", views.project_page_list),
    # path("<uuid:project_uuid>/pages/<uuid:page_uuid>", views.project_page_detail),
]
