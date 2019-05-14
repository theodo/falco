from leads.models import Lead
from rest_framework import serializers


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ("uuid", "email")
