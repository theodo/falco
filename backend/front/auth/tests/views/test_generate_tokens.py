from unittest import mock

from django.conf import settings
from django.http.cookie import SimpleCookie
from rest_framework.test import APITestCase
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenObtainSerializer

from core.models import User


class TokenErrorSerializer(TokenObtainSerializer):
    def validate(self, data):
        raise TokenError("Finally")


class GenerateTokensTestCase(APITestCase):
    def test_connection(self):
        user = User.objects.create(email="mathieud@theodo.co.uk", is_active=True)
        user.set_password("coucou")
        user.save()
        response = self.client.post(
            "/auth/jwt/create/",
            {"email": "mathieud@theodo.co.uk", "password": "coucou"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue("access" in response.json())
        self.assertTrue(isinstance(response.json().get("access"), str))
        self.assertTrue(
            isinstance(response.cookies.get(settings.REFRESH_TOKEN).value, str)
        )

    @mock.patch(
        "core.views.auth.CustomTokenObtainPairView.serializer_class",
        TokenErrorSerializer,
    )
    def test_connection_exception(self):
        user = User.objects.create(email="mathieud@theodo.co.uk", is_active=True)
        user.set_password("coucou")
        user.save()
        response = self.client.post(
            "/auth/jwt/create/",
            {"email": "mathieud@theodo.co.uk", "password": "coucou"},
        )

        self.assertEquals(response.status_code, 401)
        self.assertEquals(
            response.json(), {"code": "token_not_valid", "detail": "Finally"}
        )

    def test_refresh(self):
        user = User.objects.create(email="mathieud@theodo.co.uk", is_active=True)
        user.set_password("coucou")
        user.save()
        connexion_response = self.client.post(
            "/auth/jwt/create/",
            {"email": "mathieud@theodo.co.uk", "password": "coucou"},
        )
        refreshToken = connexion_response.cookies.get(settings.REFRESH_TOKEN).value
        self.client.cookies = SimpleCookie({settings.REFRESH_TOKEN: refreshToken})
        response = self.client.post("/auth/jwt/refresh/")

        self.assertEqual(response.status_code, 200)
        self.assertTrue("access" in response.json())
        self.assertTrue(isinstance(response.json().get("access"), str))

    def test_refresh_exception(self):
        self.client.cookies = SimpleCookie({settings.REFRESH_TOKEN: 3})
        response = self.client.post("/auth/jwt/refresh/")
        self.assertEquals(response.status_code, 401)
        self.assertEquals(
            response.json(),
            {"detail": "Token is invalid or expired", "code": "token_not_valid"},
        )

    def test_logout(self):
        user = User.objects.create(email="mathieud@theodo.co.uk", is_active=True)
        user.set_password("coucou")
        user.save()
        connexion_response = self.client.post(
            "/auth/jwt/create/",
            {"email": "mathieud@theodo.co.uk", "password": "coucou"},
        )
        refreshToken = connexion_response.cookies.get(settings.REFRESH_TOKEN).value
        self.client.cookies = SimpleCookie({settings.REFRESH_TOKEN: refreshToken})
        response = self.client.post("/auth/jwt/logout/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.cookies.get(settings.REFRESH_TOKEN).value, "")
