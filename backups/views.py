from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, FileResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.db import connection
from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse

# Create your views here.
def home(request):
    template = loader.get_template('backups/index.html')
    return HttpResponse(template.render({}, request))