from unittest.mock import patch

from django.test import Client, TestCase, override_settings
from django.urls import reverse
from front.views import FrontendView


class FrontendViewTestCase(TestCase):
    client = Client()

    @patch("front.views.FrontendView.get_initial_scripts")
    def test_prod(self, get_initial_scripts):
        get_initial_scripts.return_value = ["front/bundle.js", "front/main.chunk.js"]

        with self.assertTemplateUsed("app.html"):
            response = self.client.get(reverse("front:app"))

        self.assertEqual(
            response.resolver_match.func.__name__, FrontendView.as_view().__name__
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '<div id="root"></div>')
        self.assertRegex(
            response.content.decode("utf-8"),
            '<script src="/static/front/bundle.js"></script>',
        )
        self.assertRegex(
            response.content.decode("utf-8"),
            '<script src="/static/front/main.chunk.js"></script>',
        )

    @override_settings(DEBUG=True)
    def test_dev(self):
        with self.assertTemplateUsed("app.html"):
            response = self.client.get(reverse("front:app"))

        self.assertEqual(
            response.resolver_match.func.__name__, FrontendView.as_view().__name__
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '<div id="root"></div>')
