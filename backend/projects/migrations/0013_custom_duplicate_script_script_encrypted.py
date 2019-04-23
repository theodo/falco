from django.db import migrations


def duplicate_script_to_script_encrypted_field(apps, schema_editor):
    scripts = apps.get_model('projects', 'Script')
    for script in scripts.objects.all():
        script.script_encrypted = script.script
        script.save()


def duplicate_script_encrypted_to_script_field(apps, schema_editor):
    scripts = apps.get_model('projects', 'Script')
    for script in scripts.objects.all():
        script.script = script.script_encrypted
        script.save()


class Migration(migrations.Migration):
    dependencies = [
        ('projects', '0012_script_script_encrypted'),
    ]

    operations = [
        migrations.RunPython(
            code=duplicate_script_to_script_encrypted_field,
            reverse_code=duplicate_script_encrypted_to_script_field
        ),
    ]
