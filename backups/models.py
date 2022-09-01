from djongo import models
from datetime import datetime
#CHOICES
AREA = (
    ( 'SMT' , 'SMT'),
    ( 'CBA' , 'CBA'),
    ( 'FA' , 'FA'),
    ( 'AUDI' , 'AUDI'),
    ( 'GEN4' , 'GEN4'),
)


# Create your models here.
class machine(models.Model):
    machine_holistech = models.CharField(max_length=6, unique=True)
    machine_ipaddr = models.CharField(max_length=15)
    machine_hostname = models.CharField(max_length=253)
    machine_fisname = models.CharField(max_length=24)
    machine_area = models.CharField(choices=AREA, max_length=10)
    owner = models.CharField(max_length=100)

class requestBackup(models.Model):
    requestBackup_holistech = models.ForeignKey(machine, on_delete=models.CASCADE)
    requestBackup_reason = models.CharField(max_length=250)
    requestBackup_date = models.DateTimeField(default=datetime.now(), blank=True)