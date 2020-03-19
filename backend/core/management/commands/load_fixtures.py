from datetime import datetime, timedelta
from django.core.management.base import BaseCommand

from audits.factories import (
    AuditFactory,
    AuditResultsFactory,
    AuditStatusHistoryFactory,
)
from audits.models import Audit, AuditResults
from core.factories import AdminFactory
from projects.factories import (
    PageFactory,
    ProjectAuditParametersFactory,
    ProjectFactory,
    ProjectMemberRoleFactory,
)


class Command(BaseCommand):
    help = "Load a set of fixtures"

    def handle(self, *args, **options):
        # Creates an admin with the credentials `admin // admin`
        admin = AdminFactory()

        # Creates a first project with admin as an admin
        project = ProjectFactory()
        ProjectMemberRoleFactory(user=admin, project=project)
        parameters = ProjectAuditParametersFactory(project=project)
        page = PageFactory(project=project)

        # Creates a week worth of audits, with history and results
        for day in range(0, 6):
            audit = AuditFactory(parameters=parameters, page=page)
            timestamp = datetime.now() - timedelta(days=day)
            Audit.objects.filter(pk=audit.pk).update(created_at=timestamp)
            AuditStatusHistoryFactory(audit=audit)
            results = AuditResultsFactory(audit=audit)
            AuditResults.objects.filter(pk=results.pk).update(created_at=timestamp)
