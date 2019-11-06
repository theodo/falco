from unittest.mock import MagicMock
from celery import shared_task


@shared_task
def poll_audit_results(audit_uuid, json_url):
    pass


poll_audit_results.apply_async = MagicMock()
