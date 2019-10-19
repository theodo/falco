"""falco URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from root import views

admin.site.site_title = "falco Site Admin"
admin.site.site_header = "falco Administration"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("front.auth.auth_urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("health", views.health, name="health"),
    path("api/projects/", include("projects.urls", namespace="projects")),
    path("api/audits/", include("audits.urls", namespace="audits")),
    path("api/core/", include("core.urls", namespace="core")),
    path("", include("front.urls")),  # Keep this line last
]
