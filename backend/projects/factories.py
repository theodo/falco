import factory
from . import models


class ProjectFactory(factory.Factory):
    class Meta:
        model = models.Project

    name = "Falco docs"
    wpt_api_key = "1234567890"
    screenshot_url = "https://user-images.githubusercontent.com/2587348/77067173-d548cf00-69e4-11ea-895d-9ac1e90ebab5.png"
    is_active = True
    wpt_instance_url = "https://webpagetest.org"


class ProjectMemberRoleFactory(factory.Factory):
    class Meta:
        model = models.ProjectMemberRole


class PageFactory(factory.Factory):
    class Meta:
        model = models.Page

    name = "Homepage"
    url = "https://getfal.co"
    project = ProjectFactory()


class ScriptFactory(factory.Factory):
    class Meta:
        model = models.Script

    name = "User funnel"
    project = ProjectFactory()


class AvailableAuditParametersFactory(factory.Factory):
    class Meta:
        model = models.AvailableAuditParameters

    browser = "Chrome"
    location = "Dulles"
    location_label = "Dulles, VA"
    location_group = "Dulles, VA"
    is_active = True
    wpt_instance_url = "https://webpagetest.org"


class ProjectAuditParametersFactory(factory.Factory):
    class Meta:
        model = models.ProjectAuditParameters

    name = "Dulles | Chrome | Cable"
    configuration = AvailableAuditParametersFactory()
    network_shape = models.NetworkShapeOptions.CABLE
    project = ProjectFactory()
