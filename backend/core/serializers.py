from core.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "core.user"
        model = User
        fields = ("id", "first_name", "last_name", "email", "username")


class UserIdAndNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")
