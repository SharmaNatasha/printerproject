from django.shortcuts import render,render_to_response
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.generic import DetailView
from django.views.generic.edit import CreateView
from .models import Company
from .forms import solutionForm
from django.views.generic import FormView 
from django.views.decorators.csrf import csrf_protect
from django.template import RequestContext

def base(request):
    context_dict ={}
    #users_list = Company.objects.all()
    context_dict['result_list'] = Company.objects.all()
    print(context_dict['result_list'])
    print(request.method)
    if request.method == 'POST':
        print("here post")
        form = solutionForm(request.POST)
        company = request.POST.getlist('company')
        printer = request.POST.getlist('printer')
        issue = request.POST.getlist('issue')
        return HttpResponseRedirect(reverse('printermanagement:getAsolution')) 
    return render(request, 'base.html',context_dict)

def getAsolution(request):
    print("here get a sol")
    context_dict = {}
    if request.method == 'POST':
        print("here post")
        return HttpResponseRedirect(reverse('printermanagement:payment')) 
    return render(request, 'getAsolution.html')

def payment(request):
    print("here payment")
    return render(request, 'payment.html')



