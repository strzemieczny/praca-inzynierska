from django import forms
from django.forms import ModelForm
from .models import *

from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns

class fazitResend(forms.Form):
    fazits = forms.CharField(widget=forms.Textarea(attrs={'placeholder': _('forms_resendfazits')}), label = False)