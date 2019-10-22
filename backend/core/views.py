from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from core.models import User
from core.serializers import UserSerializer, UserIdAndNameSerializer


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns the full information of the current user", UserSerializer
        )
    },
    tags=["Users"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_infos(request):
    user = get_object_or_404(User, pk=request.user.id)
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns a list of all the users (id and name)",
            UserIdAndNameSerializer(many=True),
        )
    },
    tags=["Users"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def all_users(request):
    users = User.objects
    serializer = UserIdAndNameSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)
