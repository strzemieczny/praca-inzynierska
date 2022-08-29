from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, FileResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.db import connection
from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse

from django.core.mail import send_mail
from django.contrib.auth.models import Group
# Create your views here.


def home(request):
    IT_MEMBERS = Group.objects.get(name="IT").user_set.all()
    ENGINEERING_MEMBERS = Group.objects.get(name="Engineering").user_set.all()
    context = {}
    
    if request.user in IT_MEMBERS:
        context['is_IT'] = True
    if request.user in ENGINEERING_MEMBERS:
        context['is_Engineer'] = True

    template = loader.get_template('backups/index.html')
        # send_mail(
        #     'Test',
        #     'Here is the message.',
        #     'plblo_backup_manager@borgwarner.com',
        #     [request.user.email],
        #     fail_silently=False,
        # )
    return HttpResponse(template.render(context, request))

