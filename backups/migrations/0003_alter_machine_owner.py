# Generated by Django 4.1 on 2022-08-31 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backups', '0002_machine_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='machine',
            name='owner',
            field=models.CharField(max_length=100),
        ),
    ]
