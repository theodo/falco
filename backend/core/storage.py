import json
import os

from django.contrib.staticfiles.storage import StaticFilesStorage


class ManifestStorage(StaticFilesStorage):
    manifest_path = "front/static/front/static-manifest.json"
    prefix = "front/"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.manifest = self.get_manifest()

    def get_manifest(self):
        manifest_path = os.path.abspath(self.manifest_path)
        with open(manifest_path) as manifest:
            return json.load(manifest)

    def is_supported(self, path):
        return path.startswith(self.prefix)

    def mapped_path(self, path):
        suffix = path[len(self.prefix) :]
        if suffix in self.manifest:
            path = self.manifest[suffix]["path"]
            return f"{self.prefix}{path}"
        return path

    def path(self, name):
        if self.is_supported(name):
            return super().path(self.mapped_path(name))
        return super().path(name)

    def url(self, name):
        if self.is_supported(name):
            return super().url(self.mapped_path(name))

        return super().url(name)

    def initial_scripts(self):
        return [
            f"{self.prefix}{key}"
            for key, value in self.manifest.items()
            if value["isInitial"]
        ]
