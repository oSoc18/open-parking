# Generated by Django 2.0.7 on 2018-07-23 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_parkingdata_usage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parkingdata',
            name='limitedAccess',
            field=models.BooleanField(),
        ),
    ]