from django.conf.urls import url
from . import views

app_name = 'printermanagement'
# Application Url patterns - connect to views
urlpatterns =[
      url(r'^$', views.base, name='base'),
      #url(r'^categorySel/(?P<expname>[\w\s\-]+)/$', views.categorySel, name='categorySel')
      url(r'^getAsolution/$', views.getAsolution, name='getAsolution'), 
      url(r'^payment/$', views.payment, name='payment'),
]