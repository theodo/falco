from content import views
from django.urls import path

app_name = "content"

urlpatterns = [path("last_update_newsletter", views.get_last_update_newsletter)]
