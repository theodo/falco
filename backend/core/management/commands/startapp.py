from django.core.management.commands.startapp import Command as StartAppCommand


class Command(StartAppCommand):
    template_key = "template"
    template_path = "./.app_template"

    def handle(self, **options):
        # Override default template
        if options.get(self.template_key, None) is None:
            options[self.template_key] = self.template_path

        super().handle(**options)
