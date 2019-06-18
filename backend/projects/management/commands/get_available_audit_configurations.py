from django.core.management.base import BaseCommand
from projects.models import AvailableAuditParameters

import requests


class Command(BaseCommand):
    help = "Fetches all the available configurations from WebPageTest"

    def handle(self, *args, **kwargs):
        self.stdout.write("Started fetching from WebPageTest API")

        response = requests.get("https://www.webpagetest.org/getLocations.php?f=json")

        if response.status_code != 200:
            self.stderr.write("Unable to fetch data from WebPageTest")
            return

        try:
            data = response.json()["data"]
        except KeyError:
            self.stderr.write("Error: wrong response format")
            return

        created_items_number = 0

        for location, location_data in data.items():
            browsers = location_data["Browsers"].split(",")
            group = location_data["group"]
            label = location_data["labelShort"]
            for brower in browsers:
                configuration, created = AvailableAuditParameters.objects.get_or_create(
                    browser=brower,
                    location=location,
                    location_label=label,
                    location_group=group,
                )
                created_items_number += created
                if created:
                    self.stdout.write("Created {}".format(configuration))

        self.stdout.write(
            "Done. Created {} configurations".format(created_items_number)
        )
