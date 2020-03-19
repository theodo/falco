from datetime import datetime, timedelta
from django.core.management.base import BaseCommand

from audits.factories import (
    AuditFactory,
    AuditResultsFactory,
    AuditStatusHistoryFactory,
)
from audits.models import Audit, AuditResults
from core.factories import AdminFactory, UserFactory
from projects.factories import (
    PageFactory,
    ProjectAuditParametersFactory,
    ProjectFactory,
    ProjectMemberRoleFactory,
)
from projects.models import NetworkShapeOptions


class Command(BaseCommand):
    help = "Load a set of fixtures"

    def handle(self, *args, **options):
        # Creates an admin with the credentials `admin // admin`
        admin = AdminFactory()
        user = UserFactory()

        # Creates a first project with admin as an admin
        project = ProjectFactory()
        ProjectMemberRoleFactory(user=admin, project=project)
        ProjectMemberRoleFactory(user=user, project=project, is_admin=False)
        parameters_project = ProjectAuditParametersFactory(project=project)
        parameters2_project = ProjectAuditParametersFactory(
            project=project,
            name="Dulles | Chrome | 3G",
            network_shape=NetworkShapeOptions.THREE_G.name,
        )
        page = PageFactory(project=project)
        page2 = PageFactory(project=project, name="Docs")

        # Creates a week worth of audits, with history and results
        for day in range(0, 30):
            audit = AuditFactory(parameters=parameters_project, page=page)
            timestamp = datetime.now() - timedelta(days=day)
            Audit.objects.filter(pk=audit.pk).update(created_at=timestamp)
            AuditStatusHistoryFactory(audit=audit)
            results = AuditResultsFactory(audit=audit)
            AuditResults.objects.filter(pk=results.pk).update(created_at=timestamp)

            audit2 = AuditFactory(parameters=parameters2_project, page=page)
            Audit.objects.filter(pk=audit2.pk).update(created_at=timestamp)
            AuditStatusHistoryFactory(audit=audit2)
            results2 = AuditResultsFactory(audit=audit2)
            AuditResults.objects.filter(pk=results2.pk).update(created_at=timestamp)

            audit3 = AuditFactory(parameters=parameters_project, page=page2)
            Audit.objects.filter(pk=audit3.pk).update(created_at=timestamp)
            AuditStatusHistoryFactory(audit=audit3)
            results3 = AuditResultsFactory(audit=audit3)
            AuditResults.objects.filter(pk=results3.pk).update(created_at=timestamp)

            audit4 = AuditFactory(parameters=parameters2_project, page=page2)
            Audit.objects.filter(pk=audit4.pk).update(created_at=timestamp)
            AuditStatusHistoryFactory(audit=audit4)
            results4 = AuditResultsFactory(audit=audit4)
            AuditResults.objects.filter(pk=results4.pk).update(created_at=timestamp)
