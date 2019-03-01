from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic import TemplateView


class FrontendView(TemplateView):
    template_name = "app.html"

    def get_initial_scripts(self):
        try:
            return staticfiles_storage.initial_scripts()
        except AttributeError:
            return []

    def get_initial_stylesheets(self):
        try:
            return staticfiles_storage.initial_stylesheets()
        except AttributeError:
            return []

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            initial_scripts=self.get_initial_scripts(),
            initial_stylesheets=self.get_initial_stylesheets(),
            **kwargs
        )
