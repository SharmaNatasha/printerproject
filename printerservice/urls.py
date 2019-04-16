"""printerservice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse,HttpResponseRedirect
from django.views import generic
from django.shortcuts import render,redirect
from django.urls import reverse
from django.template import RequestContext 
from django.shortcuts import render_to_response
from django.urls import path, include
from django.conf.urls import url
from django.contrib import admin
from printermanagement import views



app_name = 'printermanagement'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'', include('printermanagement.urls',namespace="printermanagement")),
   
]
