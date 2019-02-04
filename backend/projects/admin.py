from django.contrib import admin
from projects.models import Page, Project


class PageInline(admin.TabularInline):
    model = Page


class ProjectAdmin(admin.ModelAdmin):
    inlines = [PageInline]


admin.site.register(Project, ProjectAdmin)
