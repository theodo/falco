from django.db.models.signals import post_save, pre_delete
from projects.models import MetricsPreferences, ProjectMemberRole


def save_project_member(sender, instance, **kwargs):
    MetricsPreferences.objects.create(
        project=instance.project,
        user=instance.user,
        metrics=[
            "WPTMetricFirstViewTTI",
            "WPTMetricFirstViewSpeedIndex",
            "WPTMetricFirstViewLoadTime",
        ],
    )


def delete_project_member(sender, instance, **kwargs):
    MetricsPreferences.objects.filter(
        project=instance.project, user_id=instance.user.id
    ).delete()


post_save.connect(save_project_member, sender=ProjectMemberRole)
pre_delete.connect(delete_project_member, sender=ProjectMemberRole)
