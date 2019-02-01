from unittest.mock import patch

from django.test import TestCase

from core.management.commands.startapp import Command


class StartAppCommandTestCase(TestCase):
    @patch("django.core.management.commands.startapp.Command.handle")
    def test_default_template_path(self, handle):
        command = Command()
        command.handle()
        handle.assert_called_with(template=Command.template_path)

    @patch("django.core.management.commands.startapp.Command.handle")
    def test_with_template_path(self, handle):
        command = Command()
        template = "aaaa"
        command.handle(template=template)
        handle.assert_called_with(template=template)
