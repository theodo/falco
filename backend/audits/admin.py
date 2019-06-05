from audits.models import Audit, AuditResults, AuditStatusHistory
from django.contrib import admin


class AuditStatusHistoryInline(admin.TabularInline):
    model = AuditStatusHistory
    extra = 0


class AuditResultsInline(admin.TabularInline):
    model = AuditResults
    extra = 0


class AuditAdmin(admin.ModelAdmin):
    inlines = [AuditStatusHistoryInline, AuditResultsInline]


admin.site.register(Audit, AuditAdmin)
