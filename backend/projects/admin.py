from django.contrib import admin
from projects.models import Page, Project, ProjectAuditParameters, Script, ScriptForm


class PageInline(admin.TabularInline):
    model = Page
    extra = 0


class ScriptInline(admin.TabularInline):
    model = Script
    form = ScriptForm
    extra = 0


class ProjectAuditParametersInline(admin.TabularInline):
    model = ProjectAuditParameters
    min_num = 1
    extra = 0


class ProjectAdmin(admin.ModelAdmin):
    inlines = [PageInline, ScriptInline, ProjectAuditParametersInline]
    exclude = ["screenshot_url"]
    filter_horizontal = ("members",)


admin.site.register(Project, ProjectAdmin)
