from audits.models import Audit, AuditResults, AuditStatusHistory
from django.contrib import admin


class AuditStatusHistoryInline(admin.TabularInline):
    model = AuditStatusHistory
    extra = 0


class AuditResultsInline(admin.TabularInline):
    model = AuditResults
    extra = 0


def custom_titled_filter(title):
    class Wrapper(admin.FieldListFilter):
        def __new__(cls, *args, **kwargs):
            instance = admin.FieldListFilter.create(*args, **kwargs)
            instance.title = title
            return instance

    return Wrapper


class AuditAdmin(admin.ModelAdmin):
    inlines = [AuditStatusHistoryInline, AuditResultsInline]
    list_filter = (
        ("page__project__wpt_instance_url", custom_titled_filter("Page Instance")),
        ("script__project__wpt_instance_url", custom_titled_filter("Script Instance")),
        ("page__project", custom_titled_filter("Page Project")),
        ("script__project", custom_titled_filter("Script Project")),
    )


admin.site.register(Audit, AuditAdmin)
