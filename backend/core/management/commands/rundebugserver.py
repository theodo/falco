import os

from django.contrib.staticfiles.management.commands import runserver


class Command(runserver.Command):
    def handle(self, *args, **options):
        # Try to enable vscode debugger
        try:
            import ptvsd

            # We only run the ptvsd server once, on PID 1
            # Otherwise django attempts to start the server on every refresh.
            if os.getpid() != 1 and not ptvsd.is_attached():
                ptvsd.enable_attach(address=("0.0.0.0", 9000), redirect_output=True)
                print("🖥  Remote debugger running.")
        except (ImportError, OSError) as e:
            print("⚠️  Couldn't start remote debugger:", e)
        super(Command, self).handle(*args, **options)
