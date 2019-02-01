from django.views.generic import TemplateView


class FrontendView(TemplateView):
    template_name = "app.html"

    def get_initial_scripts(self):
        from django.contrib.staticfiles.storage import staticfiles_storage

        try:
            return staticfiles_storage.initial_scripts()
        except AttributeError:
            return []

    def get_context_data(self, **kwargs):
        return super().get_context_data(
            initial_scripts=self.get_initial_scripts(), **kwargs
        )
