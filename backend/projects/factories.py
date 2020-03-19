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
