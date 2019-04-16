from django import forms
from .models import Company
from printermanagement.choices import *

# Referenced from tango with django book

# Form to get/Post the categorized sample data
class solutionForm(forms.Form):
#    company = forms.ModelChoiceField(queryset=Company.objects.all())
    company = forms.ChoiceField(choices = company, label="", initial='', widget=forms.Select(), required=True)
    printer = forms.ChoiceField(choices = printer, label="", initial='', widget=forms.Select(), required=True)
    issue = forms.ChoiceField(choices = issue, label="", initial='', widget=forms.Select(), required=True)
    
    
class detailsForm(forms.Form):
    name = forms.CharField(label='Your name')
    address = forms.CharField(label='Your address')
    number = forms.IntegerField(label='Your Phone Number')
    email = forms.EmailField(label='Your Email Id')
    