import factory
from . import models
from core.factories import UserFactory


class ProjectFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.Project
        django_get_or_create = ("name",)

    name = "Falco docs"
    wpt_api_key = "1234567890"
    screenshot_url = "https://user-images.githubusercontent.com/2587348/77067173-d548cf00-69e4-11ea-895d-9ac1e90ebab5.png"
    is_active = True
    wpt_instance_url = "https://webpagetest.org"


class ProjectMemberRoleFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.ProjectMemberRole
        django_get_or_create = ("user", "project")

    user = factory.SubFactory(UserFactory)
    project = factory.SubFactory(ProjectFactory)
    is_admin = True


class PageFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.Page
        django_get_or_create = ("name", "project")

    name = "Homepage"
    url = "https://getfal.co"
    project = factory.SubFactory(ProjectFactory)


class ScriptFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.Script

    name = "User funnel"
    project = factory.SubFactory(ProjectFactory)


class AvailableAuditParametersFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.AvailableAuditParameters

    browser = "Chrome"
    location = "Dulles"
    location_label = "Dulles, VA"
    location_group = "Dulles, VA"
    is_active = True
    wpt_instance_url = "https://webpagetest.org"


class ProjectAuditParametersFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.ProjectAuditParameters
        django_get_or_create = ("configuration", "network_shape", "project")

    name = "Dulles | Chrome | Cable"
    configuration = factory.SubFactory(AvailableAuditParametersFactory)
    network_shape = models.NetworkShapeOptions.CABLE.name
    project = factory.SubFactory(ProjectFactory)
