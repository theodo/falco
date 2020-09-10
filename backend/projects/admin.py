# Inspired from https://medium.com/@hakibenita/how-to-add-custom-action-buttons-to-django-admin-8d266f5b0d41


from django.contrib import admin
from django.utils.html import format_html
from django.urls import path, reverse
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse

from projects.forms import ManualAuditForm
from projects.models import (
    ProjectMemberRole,
    LoginScript,
    LoginScriptForm,
    Page,
    Project,
    ProjectAuditParameters,
    Script,
    ScriptForm,
    AvailableAuditParameters,
)


class PageInline(admin.TabularInline):
    model = Page
    extra = 0


class ScriptInline(admin.TabularInline):
    model = Script
    form = ScriptForm
    extra = 0


class LoginScriptInline(admin.TabularInline):
    model = LoginScript
    form = LoginScriptForm
    extra = 0


class ProjectAuditParametersInline(admin.TabularInline):
    model = ProjectAuditParameters
    min_num = 1
    extra = 0

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "configuration":
            kwargs["queryset"] = AvailableAuditParameters.objects.filter(is_active=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ProjectMemberRoleInline(admin.TabularInline):
    model = ProjectMemberRole
    extra = 1


class ProjectAdmin(admin.ModelAdmin):
    inlines = [
        ProjectMemberRoleInline,
        PageInline,
        ScriptInline,
        LoginScriptInline,
        ProjectAuditParametersInline,
    ]
    exclude = ["screenshot_url"]
    list_filter = ("is_active", "wpt_instance_url")
    list_display = ("name", "project_actions", "is_active", "created_at")

    def get_urls(self):
        current_urls = super().get_urls()
        custom_urls = [
            path(
                "<uuid:project_uuid>/launch-manual-audit/",
                self.admin_site.admin_view(self.launch_manual_audit),
                name="launch-manual-audit",
            )
        ]
        return custom_urls + current_urls

    def project_actions(self, obj):
        return format_html(
            "<a class='button' href='{}'>Launch manual audit</a>&nbsp;",
            reverse("admin:launch-manual-audit", args=[obj.pk]),
        )

    project_actions.short_description = "Project actions"
    project_actions.allow_tags = True

    def launch_manual_audit(self, request, project_uuid):
        project = Project.objects.get(pk=project_uuid)
        if request.method != "POST":
            form = ManualAuditForm(project)
        else:
            form = ManualAuditForm(project, request.POST)
            if form.is_valid():
                try:
                    form.submit_form(project, request.user)
                except Exception:
                    # If submit_form() throws error, the form will a have a non
                    # field error containing an informative message.
                    pass
                else:
                    self.message_user(
                        request, f"Audit(s) launched successfully for {project.name}!"
                    )
                    url = reverse(
                        "admin:projects_project_changelist",
                        current_app=self.admin_site.name,
                    )
                    return HttpResponseRedirect(url)
        context = self.admin_site.each_context(request)
        context["opts"] = self.model._meta
        context["form"] = form
        context["title"] = f"{project.name} - Launch manual audit"
        return TemplateResponse(request, "admin/projects/project_action.html", context)


admin.site.register(Project, ProjectAdmin)
