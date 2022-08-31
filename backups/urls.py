from django.contrib import admin
from django.urls import path, include
from . import views

from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.utils.translation import gettext_lazy as _
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('', views.home, name='home'),
    path('', include("django.contrib.auth.urls")),
    path('it/', include([
        path('', views.itview, name='itview'),
    ])),
    path('machine/', include([
            path('add/', views.addMachines, name='addMachines'),
    ])),
    path('', include("django.contrib.auth.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()