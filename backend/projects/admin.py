from django.contrib import admin
from projects.models import Page, Project, ProjectAuditParameters, Script


class PageInline(admin.TabularInline):
    model = Page


class ScriptInline(admin.TabularInline):
    model = Script


class ProjectAuditParametersInline(admin.TabularInline):
    model = ProjectAuditParameters


class ProjectAdmin(admin.ModelAdmin):
    inlines = [PageInline, ScriptInline, ProjectAuditParametersInline]


admin.site.register(Project, ProjectAdmin)
