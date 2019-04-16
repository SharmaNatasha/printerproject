from django.db import models
from django.forms import ModelForm
from printermanagement.choices import *

class Company(models.Model):
    #company = models.CharField(max_length=3,default=1)
    #printer = models.CharField(max_length=3,default=1)
    #issue = models.CharField(max_length=3,default=1)    
    
    company = models.IntegerField(choices=company,
                                default=1)
    printer = models.IntegerField(choices=printer,
                                default=1)
    issue = models.IntegerField(choices=issue,
                                default=1)