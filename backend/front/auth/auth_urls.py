from django.conf.urls import url

from .views.auth import (
    CustomLogoutView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
)

urlpatterns = [
    url(r"^jwt/create/?", CustomTokenObtainPairView.as_view(), name="jwt-create"),
    url(r"^jwt/refresh/?", CustomTokenRefreshView.as_view(), name="jwt-refresh"),
    url(r"^jwt/logout/?", CustomLogoutView.as_view(), name="logout"),
]
