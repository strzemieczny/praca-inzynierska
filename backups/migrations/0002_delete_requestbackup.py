# Generated by Django 4.1.1 on 2022-09-16 09:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backups', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='requestBackup',
        ),
    ]
