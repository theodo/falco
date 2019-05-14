from django.http import JsonResponse
from leads.models import Lead
from leads.serializers import LeadSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser


@api_view(["POST"])
def lead_list(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = LeadSerializer(data=data)
        if serializer.is_valid():
            lead = Lead.objects.create(**serializer.validated_data)
            lead.save()
            return JsonResponse(
                {"uuid": lead.uuid, **serializer.data}, status=status.HTTP_201_CREATED
            )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
