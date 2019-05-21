from datetime import datetime

from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    This class extends the rest_framework view to authenticate.
    For security reasons, we didn't want to return the refresh token in the body.
    Instead, we send the refresh token in a secure cookie not readable by the javascript.
    """

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        refresh_token = serializer.validated_data.pop("refresh")
        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        response.set_cookie(
            settings.REFRESH_TOKEN,
            refresh_token,
            expires=datetime.now() + settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
            httponly=True,
            secure=settings.STORE_REFRESH_TOKEN_COOKIE_ONLY_IN_HTTPS,
        )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    """
    This class extends the rest_framework view to create a jwt with the refresh token.
    To stay consistent with the authentication class, the refresh token is not in the body anymore.
    Instead, we are excepting to get the refresh token in the cookie.
    """

    def post(self, request, *args, **kwargs):
        data = {"refresh": request.COOKIES.get(settings.REFRESH_TOKEN)}
        serializer = self.get_serializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CustomLogoutView(generics.GenericAPIView):
    def post(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(settings.REFRESH_TOKEN)
        return response
