from djongo import models
from django.utils.translation import gettext_lazy as _
# CHOICES
AREA = (
    ('SMT', 'SMT'),
    ('CBA', 'CBA'),
    ('FA', 'FA'),
    ('AUDI', 'AUDI'),
    ('GEN4', 'GEN4'),
)
REQ_STATUS = (
    ('REQUESTED', 'Requested'),
    ('PENDING', 'Pending'),
    ('DONE', 'Done'),
)
# Create your models here.


class machine(models.Model):
    machine_holistech = models.CharField(
        max_length=6, unique=True, primary_key=True)
    machine_ipaddr = models.CharField(max_length=15)
    machine_hostname = models.CharField(max_length=253)
    machine_fisname = models.CharField(max_length=24)
    machine_area = models.CharField(choices=AREA, max_length=10)
    owner = models.CharField(max_length=100)


class backups(models.Model):
    machine = models.CharField(max_length=250)
    version = models.CharField(max_length=10)
    modify_date = models.DateTimeField(blank=True)
    sizes = models.CharField(max_length=50)
    paths = models.CharField(max_length=250)


class log(models.Model):
    hostname = models.CharField(max_length=250)
    backupType = models.CharField(max_length=30)
    extension = models.CharField(max_length=5)
    size_MB = models.DecimalField(max_digits=250, decimal_places=2)
    date = models.DateTimeField(blank=True)
    extension = models.CharField(max_length=250)
    path = models.CharField(max_length=250)


class restoredBackup(models.Model):
    restoredBackup_jiraId = models.CharField(max_length=10)
    restoredBackup_holistech = models.CharField(max_length=6)
    restoredBackup_hostname = models.CharField(max_length=250)
    restoredBackup_backup = models.CharField(max_length=250)
    restoredBackup_reason = models.CharField(max_length=250)
    restoredBackup_restoreDate = models.DateTimeField(
        auto_now_add=True, blank=True)
    restoredBackup_ifAnyTroubles = models.BooleanField()
    restoredBackup_creator = models.CharField(max_length=100)
