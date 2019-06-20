from content.models import WhatsNew
from django.contrib import admin


class WhatsnewAdmin(admin.ModelAdmin):
    class Meta:
        model = WhatsNew
        fields = "__all__"


admin.site.register(WhatsNew, WhatsnewAdmin)
