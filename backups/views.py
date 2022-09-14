from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, FileResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.db import connection
from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.contrib.auth.models import Group

from .forms import *

# Create your views here.

#! Groups
IT_MEMBERS = Group.objects.get(name="IT").user_set.all()
ENGINEERING_MEMBERS = Group.objects.get(name="Engineering").user_set.all()
#! Groups
def bad_request(message):
    data = {}
    if message == 'HolistechExists':
        data = {
            'message': message,
            'error': str(_('error_holistechexists')),
        }
        response = JsonResponse(data)
    else:
        data = {
            'message': message,
        }
        response = JsonResponse(data)
    response.status_code = 400
    return response
 
def notAuthorized(request):
    context = {}
    template = loader.get_template('backups/errors/not_authorized.html')
    if request.POST:
        form = requestAccess(request.POST)
        if form.is_valid():
            send_mail(
                'Access Request',
                'Uzytkownik: ' + request.user.first_name + ' ' + request.user.last_name + '\nEmail: ' + request.user.email + '\n\n' + 'Wiadomosc: ' + form['message'].value(),
                'plblo_backup_manager@borgwarner.com',
                ['strzemieczny@borgwarner.com'],
                fail_silently=False,
            )
            template = loader.get_template('backups/errors/not_authorized_success.html')
    return HttpResponse(template.render({'form': requestAccess}, request))

@login_required(login_url='/login')
def home(request):
    context = {}
    if request.user in IT_MEMBERS:
        return itview(request)
    if request.user in ENGINEERING_MEMBERS:
        return engineerview(request)
    else:
        return notAuthorized(request)

@login_required(login_url='/login')
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

@login_required(login_url='/login')
def engineerview(request):
    template = loader.get_template('backups/index.html')
    myRequest = requestBackup.objects.filter(requestor = request.user.id).exclude(requestBackup_status = 'DONE').order_by('-id').values()[:10]
    recentlyRestored = requestBackup.objects.filter(requestor = request.user.id, requestBackup_status = 'DONE').order_by('-id').values()[:10]
    myMachinesList = machine.objects.filter(owner=request.user.id).values()
    myBackupList = []
    for machineHostTmp in myMachinesList:
        machineHostTmpVal = machineHostTmp['machine_hostname']
        myBackupListFinal = [queryset for queryset in myBackupList if queryset]
        if len(myBackupListFinal) <= 10:
            TMPbackup = log.objects.filter(hostname=machineHostTmpVal).order_by('-date').values()[:1]
            try:
                time = datetime.now() - TMPbackup[0]['date']
                if time > timedelta(days=90):
                    myBackupList.append(TMPbackup)
            except: pass
        else: break

    return HttpResponse(template.render({'is_Engineer': True, 'myRequest' : myRequest, 'recentlyRestored': recentlyRestored,'myBackups': myBackupListFinal, 'current_user_id' : request.user.id}, request))



@login_required(login_url='/login')
def addMachines(request):
    context = {}
    is_IT = {}
    current_user = request.user.first_name + " " + request.user.last_name
    msg = ''
    template = loader.get_template('backups/add_machine.html')
    if request.user in IT_MEMBERS or request.user in ENGINEERING_MEMBERS:
        is_Engineer = True
        form = addMachine(request.POST or None)
        if request.POST:
            if form.is_valid():
                if machine.objects.filter(machine_holistech = form['machine_holistech']):
                    print('something is no yes')
                else:
                    instance = form.save()
                    instance.save()
                    return HttpResponse(template.render({'form': addMachine }, request))
            else:
                if machine.objects.filter(machine_holistech = form['machine_holistech'].value()):
                    return bad_request(message='HolistechExists')
                print(request.POST)
                return bad_request(message='This is a bad request')
    else: return home(request)
    return HttpResponse(template.render({'form': addMachine, 'is_Engineer': is_Engineer, 'current_user' : current_user, 'current_user_id' : request.user.id, 'msg': msg}, request))
    


# do zrobienia jak beda backupy w bazce - lista podswietlana/sortowana na podstawie daty backupu
@login_required(login_url='/login')
def myMachines(request):
    context = {}
    if request.user not in ENGINEERING_MEMBERS:
        return notAuthorized(request)
    else:
        is_Engineer = True
        myMachinesList = machine.objects.filter(owner=request.user.id).values()
        template = loader.get_template('backups/eng_machines.html')
        return HttpResponse(template.render({'is_Engineer': is_Engineer, 'myMachines': myMachinesList}, request))

@login_required(login_url='/login')
def myBackups(request):
    context = {}
    if request.user not in ENGINEERING_MEMBERS:
        return notAuthorized(request)
    else:
        is_Engineer = True
        myMachinesList = machine.objects.filter(owner=request.user.id).values()
        myBackupList = []
        for machineHostTmp in myMachinesList:
            machineHostTmpVal = machineHostTmp['machine_hostname']
            myBackupListFinal = [queryset for queryset in myBackupList if queryset]
            myBackupList.append(log.objects.filter(hostname=machineHostTmpVal).order_by('hostname').values())
            # print(myBackupList)
        template = loader.get_template('backups/eng_backups.html')
        return HttpResponse(template.render({'is_Engineer': is_Engineer, 'myBackupList': myBackupList}, request))

@login_required(login_url='/login')
def requestBackups(request):
    context = {}
    if request.user not in ENGINEERING_MEMBERS:
        return notAuthorized(request)
    else:
        if request.POST:
            form = requestBackupForm(request.POST or None)
            if form.is_valid():
                instance = form.save()
                instance.save()
                template = loader.get_template('backups/errors/not_authorized_success.html')
                return HttpResponse(template.render({}, request))
            else:
                return bad_request(message='Form is not valid')
        else:
            is_Engineer = True
            req_owner = machine.objects.filter(owner=request.user.id).values
            template = loader.get_template('backups/eng_request.html')
            return HttpResponse(template.render({'is_Engineer': is_Engineer, 'req_owner': req_owner, 'requestBackup': requestBackupForm, 'current_user_id' : request.user.id}, request))
