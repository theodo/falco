from django.contrib import admin
from leads.models import Lead


class LeadAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")


admin.site.register(Lead, LeadAdmin)
