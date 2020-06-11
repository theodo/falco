from django.utils import timezone
from core.models import User


class LastVisitedAtUpdateMiddleware:
    """
        updates the last_visited_at field in the database for a specific user
        every time they are authenticated and they load their first project
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        response = self.get_response(request)

        if request.path == "/api/projects/first" and request.user.is_authenticated:
            # Update last visit time after request finished processing.
            User.objects.filter(pk=request.user.pk).update(
                last_visited_at=timezone.now()
            )

        # Code to be executed for each request/response after
        # the view is called.

        return response
