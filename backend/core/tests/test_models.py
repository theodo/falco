from django.test import TestCase

from core.models import BaseModel


class BaseModelTestCase(TestCase):
    def test_str(self):
        inst = BaseModel()
        self.assertRegexpMatches(str(inst), "^basemodel:[0-9a-f]{6}$")
