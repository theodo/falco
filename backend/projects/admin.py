from django.contrib import admin
from projects.models import Page, Project, ProjectAuditParameters


class PageInline(admin.TabularInline):
    model = Page


class ProjectAuditParametersInline(admin.TabularInline):
    model = ProjectAuditParameters


class ProjectAdmin(admin.ModelAdmin):
    inlines = [PageInline, ProjectAuditParametersInline]

admin.site.register(Project, ProjectAdmin)
