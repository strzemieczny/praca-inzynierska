from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.contrib.auth.models import Group
from .forms import *
from django.db.models import Count
from django.conf import settings
#! Jira API
from jira import JIRA
#! Jira API

#! Groups
IT_MEMBERS = Group.objects.get(name="IT").user_set.all()
ENGINEERING_MEMBERS = Group.objects.get(name="Engineering").user_set.all()
#! Groups
MONGO = getattr(settings, "MONGO", None)
#! Jira Config
jira_api_token = 'ZBoKhbt8TpC5xF9tdG4yDF15'
jira_user = 'strzemieczny@borgwarner.com'
jira_server = 'https://plblo-it.atlassian.net'
jira_options = {
    'server': jira_server
}
#! Jira Config


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
    template = loader.get_template('backups/errors/not_authorized.html')
    if request.POST:
        form = requestAccess(request.POST)
        if form.is_valid():
            send_mail(
                'Access Request',
                'Uzytkownik: ' + request.user.first_name + ' ' + request.user.last_name +
                '\nEmail: ' + request.user.email + '\n\n' +
                'Wiadomosc: ' + form['message'].value(),
                'plblo_backup_manager@borgwarner.com',
                ['strzemieczny@borgwarner.com'],
                fail_silently=False,
            )
            template = loader.get_template(
                'backups/errors/not_authorized_success.html')
    return HttpResponse(template.render({'form': requestAccess}, request))


@login_required(login_url='/login')
def home(request):
    if request.user in IT_MEMBERS:
        return itview(request)
    if request.user in ENGINEERING_MEMBERS:
        return engineerview(request)
    else:
        return notAuthorized(request)


@login_required(login_url='/login')
def itview(request):
    context = []
    context2 = []
    is_IT = False
    if request.user in ENGINEERING_MEMBERS and request.user not in IT_MEMBERS:
        return home(request)
    if request.user in IT_MEMBERS:
        jira_jira = JIRA(jira_options, basic_auth=(jira_user, jira_api_token))
        jira_backupIssues = jira_jira.search_issues(
            'summary ~ Backup AND status in (Escalated, "In Progress", Pending, "Waiting for customer", "Waiting for support")')
        for jira_backupIssue in jira_backupIssues:
            jira_issue = jira_jira.issue(jira_backupIssue)
            jira_hostname = jira_issue.raw['fields']['customfield_10060']
            jira_holistech = jira_issue.raw['fields']['customfield_10058']
            jira_reason = jira_issue.raw['fields']['customfield_10071']
            jira_description = jira_issue.raw['fields']['description']
            jira_creator = jira_issue.raw['fields']['creator']['displayName']
            if jira_issue.raw['fields']['assignee']['displayName'] is not None:
                jira_assignee = jira_issue.raw['fields']['assignee']['displayName']
            context.append({
                'id': jira_issue,
                'hostname': jira_hostname,
                'holistech': jira_holistech,
                'reason': jira_reason,
                'description': jira_description,
                'creator': jira_creator,
                'assignee': jira_assignee
            })
        jira_backupIssuesWaiting = jira_jira.search_issues(
            'summary ~ BackupMonitor AND status in (Escalated, "In Progress", Pending, "Waiting for customer", "Waiting for support")')
        for jira_backupIssue in jira_backupIssuesWaiting:
            jira_issue = jira_jira.issue(jira_backupIssue)
            jira_description = str(jira_issue.raw['fields']['description'])
            jira_description_list = jira_description.split("\n")
            jira_description_list_filtered = ['', '', '']
            i = 0
            for elem in jira_description_list:
                elem1 = elem.split(": ")
                jira_description_list_filtered[i] = elem1[1]
                i += 1
            if jira_issue.raw['fields']['assignee']['displayName'] is not None:
                jira_assignee = jira_issue.raw['fields']['assignee']['displayName']

            context2.append({
                'id': jira_issue,
                'holistech': jira_description_list_filtered[0],
                'description': jira_description_list_filtered[1],
                'creator': jira_description_list_filtered[2],
                'assignee': jira_assignee
            })

        #! get expired backups
        itview_expiredBackups = list(
            log.objects.all().order_by('-date').values())
        itview_expiredBackupsSorted = []
        itview_expiredBackupsHostnameTmp = set()
        for itview_expiredBackupsSingle in itview_expiredBackups:
            if itview_expiredBackupsSingle['hostname'] not in itview_expiredBackupsHostnameTmp:
                itview_expiredBackupsHostnameTmp.add(
                    itview_expiredBackupsSingle['hostname'])
                if itview_expiredBackupsSingle['date'] <= timezone.now() - timedelta(days=180):
                    itview_expiredBackupsSorted.append(
                        itview_expiredBackupsSingle)
            else:
                pass
        itview_expiredBackupsSorted = list(
            reversed(itview_expiredBackupsSorted))
        #! get expired backups
        is_IT = True
        template = loader.get_template('backups/index.html')
    else:
        return notAuthorized(request)
    return HttpResponse(template.render({'is_IT': is_IT, 'context': context, 'context2': context2, 'expiredBackups': itview_expiredBackupsSorted}, request))


@ login_required(login_url='/login')
def itDashboard(request):
    template = loader.get_template('backups/it_dashboard.html')
    is_IT = {}
    if request.user in ENGINEERING_MEMBERS and request.user not in IT_MEMBERS:
        return home(request)
    if request.user in IT_MEMBERS:
        is_IT = True
        itDashboard_allBackupsCount = log.objects.values('hostname').annotate(
            Count("hostname"))
        itDashboard_allBackupsNewest = log.objects.all().order_by(
            'date').values().order_by('-date')[:500]
        itDashboard_allBackupsOldest = log.objects.all().order_by(
            'date').values().order_by('date')[:500]
    return HttpResponse(template.render({'form': addMachine, 'is_IT': is_IT, 'allBackupsCount': itDashboard_allBackupsCount, 'allBackupsNewest': itDashboard_allBackupsNewest, 'allBackupsOldest': itDashboard_allBackupsOldest}, request))


@ login_required(login_url='/login')
def itMachines(request):
    template = loader.get_template('backups/it_machines.html')
    is_IT = {}
    if request.user in ENGINEERING_MEMBERS and request.user not in IT_MEMBERS:
        return home(request)
    if request.user in IT_MEMBERS:
        is_IT = True
        itMachines_all = machine.objects.all().values()
    return HttpResponse(template.render({'is_IT': is_IT, 'allMachines': itMachines_all}, request))


@ login_required(login_url='/login')
def machineDetails(request, hostname):
    template = loader.get_template('backups/machineDetails.html')
    if request.user in ENGINEERING_MEMBERS and request.user not in IT_MEMBERS:
        return home(request)
    if request.user in IT_MEMBERS:
        is_IT = True
        machineDetails_getDetails = machine.objects.filter(
            machine_hostname=hostname).values()
        machineDetails_getBackups = log.objects.filter(
            hostname=hostname).values()
    return HttpResponse(template.render({'form': addMachine, 'is_IT': is_IT, 'details': machineDetails_getDetails, 'backups': machineDetails_getBackups}, request))


@ login_required(login_url='/login')
def engineerview(request):
    template = loader.get_template('backups/index.html')
    #! get holistech ids for my machines
    myMachinesList = machine.objects.filter(owner=request.user.id).values()
    myMachinesList_holistechList = list()
    myMachinesList_holistechListPendingDetails = []
    myMachinesList_holistechListRestoredDetails = []
    for myMachinesList_machine in myMachinesList:
        myMachinesList_machine_Dict = list(myMachinesList_machine.values())
        myMachinesList_holistechList.append(myMachinesList_machine_Dict[0])
    #! get holistech ids for my machines

    #! get issues details
    jira_jira = JIRA(jira_options, basic_auth=(jira_user, jira_api_token))
    for myMachinesList_holistechList_id in myMachinesList_holistechList:
        jira_backupIssuesPending = jira_jira.search_issues(
            'summary ~ Backup AND "Holistech ID[Short text]" ~ ' + str(myMachinesList_holistechList_id))
        for jira_issue_id in jira_backupIssuesPending:
            myMachines_backupIssues = jira_jira.issue(
                jira_issue_id)
            myMachinesList_holistechList_holistech = myMachines_backupIssues.raw[
                'fields']['customfield_10058']
            myMachinesList_holistechList_description = myMachines_backupIssues.raw[
                'fields']['description']
            myMachinesList_holistechList_created = datetime.strptime(myMachines_backupIssues.raw[
                'fields']['created'], '%Y-%m-%dT%H:%M:%S.%f+0200')
            myMachinesList_holistechList_status = myMachines_backupIssues.raw[
                'fields']['status']['name']
            if myMachinesList_holistechList_status == "Rozwiązane":
                myMachinesList_holistechListPendingDetails.append({
                    'holistech': myMachinesList_holistechList_holistech,
                    'description': myMachinesList_holistechList_description,
                    'date': myMachinesList_holistechList_created,
                    'status': myMachinesList_holistechList_status
                })
            else:
                myMachinesList_holistechListRestoredDetails.append({
                    'holistech': myMachinesList_holistechList_holistech,
                    'description': myMachinesList_holistechList_description,
                    'date': myMachinesList_holistechList_created,
                    'status': myMachinesList_holistechList_status
                })
    #! get issues details

    myMachinesList = machine.objects.filter(owner=request.user.id).values()
    myBackupList = []
    for machineHostTmp in myMachinesList:
        machineHostTmpVal = machineHostTmp['machine_hostname']
        myBackupListFinal = [queryset for queryset in myBackupList if queryset]
        if len(myBackupListFinal) <= 10:
            TMPbackup = log.objects.filter(
                hostname=machineHostTmpVal).order_by('-date').values()[:1]
            try:
                time = datetime.now() - TMPbackup[0]['date']
                if time > timedelta(days=90):
                    myBackupList.append(TMPbackup)
            except:
                pass
        else:
            break
    return HttpResponse(template.render({'is_Engineer': True, 'pendingBackups': myMachinesList_holistechListRestoredDetails, 'recentlyRestored': myMachinesList_holistechListPendingDetails, 'current_user_id': request.user.id}, request))


@ login_required(login_url='/login')
def addMachines(request):
    current_user = request.user.first_name + " " + request.user.last_name
    msg = ''
    is_IT = {}
    is_Engineer = {}
    template = loader.get_template('backups/add_machine.html')
    if request.user in ENGINEERING_MEMBERS:
        is_Engineer = True
    if request.user in IT_MEMBERS:
        is_IT = True
    if is_Engineer or is_IT:
        form = addMachine(request.POST or None)
        if request.POST:
            if form.is_valid():
                if machine.objects.filter(machine_holistech=form['machine_holistech']):
                    print('something is no yes')
                else:
                    instance = form.save()
                    instance.save()
                    return HttpResponse(template.render({'form': addMachine}, request))
            else:
                if machine.objects.filter(machine_holistech=form['machine_holistech'].value()):
                    return bad_request(message='HolistechExists')
                print(request.POST)
                return bad_request(message='This is a bad request')
    else:
        return home(request)
    return HttpResponse(template.render({'form': addMachine, 'is_Engineer': is_Engineer, 'is_IT': is_IT, 'current_user': current_user, 'current_user_id': request.user.id, 'msg': msg}, request))


@ login_required(login_url='/login')
def myMachines(request):
    if request.user not in ENGINEERING_MEMBERS:
        return notAuthorized(request)
    else:
        is_Engineer = True
        myMachinesList = machine.objects.filter(owner=request.user.id).values()
        template = loader.get_template('backups/eng_machines.html')
        return HttpResponse(template.render({'is_Engineer': is_Engineer, 'myMachines': myMachinesList}, request))


@ login_required(login_url='/login')
def myBackups(request):
    if request.user not in ENGINEERING_MEMBERS:
        return notAuthorized(request)
    else:
        is_Engineer = True
        myMachinesList = machine.objects.filter(owner=request.user.id).values()
        myBackupList = []
        for machineHostTmp in myMachinesList:
            machineHostTmpVal = machineHostTmp['machine_hostname']
            myBackupList.append(log.objects.filter(
                hostname=machineHostTmpVal).order_by('hostname').values())
        template = loader.get_template('backups/eng_backups.html')
        return HttpResponse(template.render({'is_Engineer': is_Engineer, 'myBackupList': myBackupList}, request))
