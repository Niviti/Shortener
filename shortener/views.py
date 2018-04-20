
from django.views.generic import TemplateView
from django.shortcuts import render
from rest_framework.decorators import api_view
from .forms import UrlModelForm
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .models import Url

class HomeView(TemplateView):
    template_name = 'home.html'

@api_view(['POST'])
def AddUrl(request):
    print(request)

    form = UrlModelForm(data=request.data)

    if form.is_valid():
        form.save()
        return Response(form.data, status=status.HTTP_201_CREATED)

    return Response(form.data, status=status.HTTP_400_BAD_REQUEST)

