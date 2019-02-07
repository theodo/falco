import json
import os

from core.storage import ManifestStorage
from django.conf import settings
from django.test import TestCase


class ManifestStorageTestCase(TestCase):
    manifest = {"a": {"path": "b", "isInitial": True}}

    @classmethod
    def setUpClass(cls):
        cls.original_manifest_path = ManifestStorage.manifest_path
        ManifestStorage.manifest_path = f"{settings.BASE_DIR}/test.manifest"

        manifest_path = os.path.abspath(ManifestStorage.manifest_path)
        with open(manifest_path, "w+") as manifest:
            return json.dump(cls.manifest, manifest)

    @classmethod
    def tearDownClass(cls):
        ManifestStorage.manifest_path = cls.original_manifest_path

    def test_init(self):
        storage = ManifestStorage()
        self.assertEqual(storage.manifest, self.manifest)

    def test_get_manifest(self):
        storage = ManifestStorage()
        self.assertEqual(storage.get_manifest(), self.manifest)

    def test_is_supported(self):
        storage = ManifestStorage()
        self.assertTrue(storage.is_supported("front/a"))
        self.assertFalse(storage.is_supported("fronta"))
        self.assertFalse(storage.is_supported("other"))

    def test_mapped_path(self):
        storage = ManifestStorage()
        self.assertEqual(storage.mapped_path("front/a"), "front/b")
        self.assertEqual(storage.mapped_path("front/c"), "front/c")
        self.assertEqual(storage.mapped_path("d"), "d")

    def test_path(self):
        storage = ManifestStorage()
        self.assertEqual(storage.path("front/a"), f"{settings.STATIC_ROOT}/front/b")
        self.assertEqual(storage.path("front/c"), f"{settings.STATIC_ROOT}/front/c")
        self.assertEqual(storage.path("d"), f"{settings.STATIC_ROOT}/d")

    def test_url(self):
        storage = ManifestStorage()
        self.assertEqual(storage.url("front/a"), f"{settings.STATIC_URL}front/b")
        self.assertEqual(storage.url("front/c"), f"{settings.STATIC_URL}front/c")
        self.assertEqual(storage.url("d"), f"{settings.STATIC_URL}d")

    def test_initial_scripts(self):
        storage = ManifestStorage()
        self.assertEqual(storage.initial_scripts(), [])
