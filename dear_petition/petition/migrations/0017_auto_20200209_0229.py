# Generated by Django 2.2.4 on 2020-02-09 02:29

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("petition", "0016_auto_20200209_0226"),
    ]

    operations = [
        migrations.AlterField(
            model_name="batch",
            name="user",
            field=models.ForeignKey(
                on_delete="CASCADE", related_name="batches", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
