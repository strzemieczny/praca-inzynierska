from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, Http404, FileResponse
from django.contrib.auth.decorators import login_required
from .forms import *
import paramiko
import re

# Create your views here.
@login_required()
def fazit(request):
    form = fazitResend(request.POST or None)
    template = loader.get_template('fazit/index-fazit.html')
    if request.POST:
        if form.is_valid():
            host = '10.237.135.13'
            user = 'django'
            passwd = 'djangoapps!@21'
            fazits = form['fazits'].value()
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(hostname=host, username=user,
                        password=passwd, look_for_keys=False)
            for line in fazits.splitlines():
                VWpattern = re.compile("[D][P][Z][-][0-9A-Z]{5}[.][0-9]{2}[.][0-9]{2}[U][P][S][0-9]{5}")
                AUDIpattern = re.compile("[D][P][Z][-][0-9A-Z]{5}[.][0-9]{2}[.][0-9]{2}[U][P][0-9]{6}")
                if VWpattern.match(line):
                    src = "/fis/mantis/data/FAZIT/save/"
                    dst = "/fis/mantis/data/FAZIT/tmp/"
                    command = "mv " + str(src) + line + "_txt" + " " + dst
                    (stdin, stdout, stderr) = ssh.exec_command(command)
                elif AUDIpattern.match(line):
                    src = "/fis/mantis/data/FAZIT_XML/save/"
                    dst = "/fis/mantis/data/FAZIT_XML/tmp/"
                    command = "mv " + str(src) + line + "_txt" + " " + dst
                    (stdin, stdout, stderr) = ssh.exec_command(command)
                else:
                    print("FAZIT string is not valid")
            return HttpResponse(template.render({'form': fazitResend }, request))
    return HttpResponse(template.render({'form': fazitResend }, request))
    