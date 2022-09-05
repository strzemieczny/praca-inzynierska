from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, Http404, FileResponse
# Create your views here.
def home(request):
    template = loader.get_template('main/index.html')
    return HttpResponse(template.render({}, request))