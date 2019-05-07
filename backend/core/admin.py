from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from core.models import User


class CustomUserAdmin(UserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "email",
                )
            },
        ),
    )


admin.site.register(User, CustomUserAdmin)
