from django.urls import path
from leads import views

app_name = "leads"

urlpatterns = [path("", views.lead_list)]
