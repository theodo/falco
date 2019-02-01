from django.test import Client, TestCase
from django.urls import reverse

from Falco.views import health


class HealthViewTestCase(TestCase):
    client = Client()

    def test_prod(self):
        response = self.client.get(reverse("health"))

        self.assertEqual(response.resolver_match.func, health)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"")
