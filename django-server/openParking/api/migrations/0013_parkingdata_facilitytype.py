# Generated by Django 2.0.7 on 2018-07-11 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20180711_0836'),
    ]

    operations = [
        migrations.AddField(
            model_name='parkingdata',
            name='facilityType',
            field=models.CharField(default='offstreet', max_length=255),
        ),
    ]
