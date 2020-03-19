import factory
from . import models


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.User
        django_get_or_create = ("username",)

    first_name = "Jane"
    last_name = "Doe"
    username = "janed"
    email = "jane.doe@gmail.com"
    password = factory.PostGenerationMethodCall("set_password", "janedoe")


class AdminFactory(UserFactory):
    first_name = "Super"
    last_name = "Admin"
    username = "admin"
    email = "admin@gmail.com"
    password = factory.PostGenerationMethodCall("set_password", "admin")
    is_staff = True
