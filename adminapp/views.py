



from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.shortcuts import render
from shortener.models import Url

class Dashboard(LoginRequiredMixin, TemplateView):
    login_url = '/adminapp/login/'
    template_name = 'dashboard.html'


    def get(self, request, *args, **kwargs):

          urls = Url.objects.all()

          context =  {
          'urls': urls
          }

          return render(request, self.template_name, context)
