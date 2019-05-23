import os
import logging

from django.core.mail import EmailMessage
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
            try:
                message = "A new user just asked for a demo !\nEmail: " + lead.email
                email = EmailMessage(
                    "New lead on Falco",
                    message,
                    from_email=os.environ.get("EMAIL_FROM"),
                    to=os.environ.get("EMAIL_TO").split(","),
                )
                email.send(fail_silently=False)
            except Exception as e:
                logging.error(f"Email could not be sent: {e}")

            return JsonResponse(
                {"uuid": lead.uuid, **serializer.data}, status=status.HTTP_201_CREATED
            )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
