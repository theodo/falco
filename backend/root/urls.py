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
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from root import views


admin.site.site_title = "falco Site Admin"
admin.site.site_header = "falco Administration"

schema_view = get_schema_view(
    openapi.Info(
        title="Falco API",
        default_version="",
        description="""This is the API documentation for this instance of [Falco](https://getfal.co).

If you have any question or would want to raise an issue, head to the [GitHub repository](https://github.com/theodo/falco).


To obtain a Falco API Key, you can login to Falco and inspect any XHR call inside the Dev Tools.""",
        terms_of_service="https://github.com/theodo/falco/blob/master/CODE_OF_CONDUCT.md",
        contact=openapi.Contact(email="falco@theodo.fr"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
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
