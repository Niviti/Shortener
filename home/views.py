from django.shortcuts import render
from django.views.generic import TemplateView


'home.views.my_custom_page_not_found_view'



class my_custom_page_not_found_view(TemplateView):

    template_name = '404.html'

    def get(self, *args, **kwargs):

        return render(self.template_name)


