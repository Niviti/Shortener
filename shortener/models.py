from django.db import models


class Url(models.Model):

   url = models.CharField(max_length=400)
   urlshort = models.CharField(max_length=100)

   def __str__(self):
        return self.urlshort