from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from core.models import User


class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "last_visited_at",
    )

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
