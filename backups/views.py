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

from .forms import requestAccess
# Create your views here.

#! Groups
IT_MEMBERS = Group.objects.get(name="IT").user_set.all()
ENGINEERING_MEMBERS = Group.objects.get(name="Engineering").user_set.all()
#! Groups

def notAuthorized(request):
    context = {}
    template = loader.get_template('backups/errors/not_authorized.html')
    if request.POST:
        form = requestAccess(request.POST)
        if form.is_valid():
            send_mail(
                '[BackupManager] Access Request',
                'Uzytkownik: ' + request.user.first_name + ' ' + request.user.last_name + '\nEmail: ' + request.user.email + '\n\n' + 'Wiadomosc: ' + form['message'].value(),
                'plblo_backup_manager@borgwarner.com',
                ['strzemieczny@borgwarner.com'],
                fail_silently=False,
            )
            template = loader.get_template('backups/errors/not_authorized_success.html')
    return HttpResponse(template.render({'form': requestAccess}, request))

@login_required(login_url='../login')
def home(request):
    context = {}
    if request.user in IT_MEMBERS:
        return itview(request)
    if request.user in ENGINEERING_MEMBERS:
        context['is_Engineer'] = True
        template = loader.get_template('backups/index.html')
    else:
        return notAuthorized(request)
    return HttpResponse(template.render(context, request))

@login_required(login_url='../login')
def itview(request):
    context = {}
    if request.user in ENGINEERING_MEMBERS and request.user not in IT_MEMBERS:
        return home(request)
    if request.user in IT_MEMBERS:
        context['is_IT'] = True
        template = loader.get_template('backups/it_index.html')
    else:
        return notAuthorized(request)
    return HttpResponse(template.render(context, request))
