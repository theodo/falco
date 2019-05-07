from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from core.models import User
from core.serializers import UserSerializer
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_infos(request):
    user = get_object_or_404(User, pk=request.user.id)
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)
