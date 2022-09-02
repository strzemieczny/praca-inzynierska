from django import forms
from django.forms import ModelForm
from .models import *

from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns

class requestAccess(forms.Form):
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': _('forms_requestaccessplaceholder')}), label=False)

#CHOICES
AREA = (
    ( 'SMT' , 'SMT'),
    ( 'CBA' , 'CBA'),
    ( 'FA' , 'FA'),
    ( 'AUDI' , 'AUDI'),
    ( 'GEN4' , 'GEN4'),
)
#! add new machine form
class addMachine(ModelForm):
    machine_area = forms.ChoiceField(choices = AREA)

    class Meta:
        model = machine
        fields = ['machine_holistech', 'machine_ipaddr', 'machine_hostname', 'machine_fisname', 'machine_area', 'owner']
        widgets = {
            'machine_holistech': forms.TextInput(attrs={'placeholder': _('placeholder_machine_holistech')}),
            'machine_ipaddr': forms.TextInput(attrs={'placeholder': _('placeholder_machine_ipaddr')}),
            'machine_hostname': forms.TextInput(attrs={'placeholder': _('placeholder_machine_hostname')}),
            'machine_fisname': forms.TextInput(attrs={'placeholder': _('placeholder_machine_fisname')}),
            'owner': forms.TextInput(attrs={'hidden': ''}),
        }
        labels = {
            'machine_holistech': _('label_machine_holistech'),
            'machine_ipaddr': _('label_machine_ipaddr'),
            'machine_hostname': _('label_machine_hostname'),
            'machine_fisname': _('label_machine_fisname'),
            'machine_area': _('label_machine_area'),
            'owner': '',
        }

# class requestBackup1(forms.ModelForm):
#     request_Backup1 = 