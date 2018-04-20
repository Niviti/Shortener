

from django import forms
from .models import Url

class UrlModelForm(forms.ModelForm):
    class Meta:
        model = Url

        fields = [
            "url",
            "urlshort",
        ]

