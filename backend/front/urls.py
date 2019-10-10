from django.urls import re_path

from .views import index

app_name = "front"
urlpatterns = [re_path(r"^[a-zA-Z0-9/-]*$", index, name="index")]
