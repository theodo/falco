import factory
from . import models


class UserFactory(factory.Factory):
    class Meta:
        model = models.User

    first_name = "Jane"
    last_name = "Doe"
    email = "jane.doe@gmail.com"


class AdminFactory(UserFactory):
    is_staff = True
