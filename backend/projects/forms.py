# Inspired from https://medium.com/@hakibenita/how-to-add-custom-action-buttons-to-django-admin-8d266f5b0d41


from django import forms
from datetime import datetime, timedelta

from audits.models import Audit, AuditResults, Script
from audits.tasks import request_audit
from projects.permissions import check_if_member_of_project

WPT_API_CALLS_BY_DAY = 200

# 3 runs by audit as defined in the `request_audit` task in `tasks.py`
# 2 different contexts: first view + repeat view
WPT_RUNS_BY_PAGE_OR_SCRIPT = 3 * 2


class ManualAuditForm(forms.Form):
    def __init__(self, project, *args, **kwargs):
        forms.Form.__init__(self, *args, **kwargs)
        self.fields["page_or_script_to_audit"].choices = self.get_pages_scripts_choices(
            project
        )
        self.fields[
            "audit_parameters_to_use"
        ].choices = self.get_audit_parameters_choices(project)
        self.fields[
            "today_remaining_API_calls"
        ].initial = self.get_today_remaining_api_calls(project)

    page_or_script_to_audit = forms.ChoiceField(choices=[])
    audit_parameters_to_use = forms.ChoiceField(choices=[])
    today_remaining_API_calls = forms.IntegerField(
        disabled=True,
        initial=0,
        help_text=f"""
                    Each day, we are limited to {WPT_API_CALLS_BY_DAY} calls to WebPageTest API by project
                     (more specifically, by API key).
                    <br />
                    6 API calls (3 runs in First View and Repeat View) are made for each page or script step,
                     and for each audit parameters set.
                    <br />
                    Use this manual audit submission cautiously!
                    <br />
                    <i>This number of remaining API calls is an estimation and may not be totally accurate.</i>
                """,
    )

    field_order = (
        "page_or_script_to_audit, audit_parameters_to_use, today_remaining_API_calls"
    )

    @staticmethod
    def get_pages_scripts_choices(project):
        pages_scripts_choices = []
        if (project.pages.all().count() + project.scripts.all().count()) > 0:
            pages_scripts_choices += [("__all__", "All pages and scripts")]
        pages_scripts_choices += list(
            map(lambda page: (page.uuid, f"Page: {page.name}"), project.pages.all())
        )
        pages_scripts_choices += list(
            map(
                lambda script: (script.uuid, f"Script: {script.name}"),
                project.scripts.all(),
            )
        )
        return pages_scripts_choices

    @staticmethod
    def get_audit_parameters_choices(project):
        audit_parameters_choices = []
        if (project.audit_parameters_list.count()) > 0:
            audit_parameters_choices += [("__all__", "All audit parameters")]
        audit_parameters_choices += list(
            map(
                lambda audit_parameter: (
                    audit_parameter.uuid,
                    f"{audit_parameter.name}",
                ),
                project.audit_parameters_list.all(),
            )
        )
        return audit_parameters_choices

    @staticmethod
    def get_today_remaining_api_calls(project):
        today_pages_results = AuditResults.objects.filter(
            audit__page__project=project,
            updated_at__gte=datetime.today() - timedelta(days=1),
        ).count()
        today_scripts_results = AuditResults.objects.filter(
            audit__script__project=project,
            updated_at__gte=datetime.today() - timedelta(days=1),
        ).count()
        return max(
            WPT_API_CALLS_BY_DAY
            - WPT_RUNS_BY_PAGE_OR_SCRIPT
            * (today_pages_results + today_scripts_results),
            0,
        )

    def submit_form(self, project, user):
        try:
            check_if_member_of_project(user.id, project.uuid)
            page_or_script_to_audit_uuid = self.data["page_or_script_to_audit"]
            audit_parameters_uuid = self.data["audit_parameters_to_use"]

            if "__all__" == page_or_script_to_audit_uuid:
                pages_to_audit = project.pages.all()
                scripts_to_audit = project.scripts.all()
            else:
                pages_to_audit = project.pages.filter(uuid=page_or_script_to_audit_uuid)
                scripts_to_audit = project.scripts.filter(
                    uuid=page_or_script_to_audit_uuid
                )

            if "__all__" == audit_parameters_uuid:
                audit_parameters_list = project.audit_parameters_list.all()
            else:
                audit_parameters_list = project.audit_parameters_list.filter(
                    uuid=audit_parameters_uuid
                )

            for audit_parameters in audit_parameters_list:
                for page_to_audit in pages_to_audit:
                    new_page_audit = Audit(
                        page=page_to_audit, parameters=audit_parameters
                    )
                    new_page_audit.save()
                    request_audit.delay(new_page_audit.uuid)

                for script_to_audit in scripts_to_audit:
                    new_script_audit = Audit(
                        script=script_to_audit, parameters=audit_parameters
                    )
                    new_script_audit.save()
                    request_audit.delay(new_script_audit.uuid)

        except Exception as e:
            error_message = str(e)
            self.add_error(None, error_message)
            raise

        return True


class ScriptForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ScriptForm, self).__init__(*args, **kwargs)
        self.fields["script"].strip = False

    class Meta:
        model = Script
        fields = "__all__"
