from django import forms
# from django.forms import ModelForm

from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns

class requestAccess(forms.Form):
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': _('forms_requestaccessplaceholder')}), label=False)