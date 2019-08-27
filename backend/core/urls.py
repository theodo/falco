from django.urls import path
from core import views

app_name = "core"

urlpatterns = [path("user", views.user_infos), path("users", views.all_users)]
