from django.urls import re_path

from front.views import FrontendView

app_name = "front"
urlpatterns = [re_path(r"^[a-zA-Z0-9/-]*$", FrontendView.as_view(), name="app")]
