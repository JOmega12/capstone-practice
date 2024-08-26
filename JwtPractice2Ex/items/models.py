from django.db import models
from django.contrib.auth.models import User

# from users.models import CustomUser

# Create your models here.

class Item(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='items')
    name = models.CharField(max_length=20)
    body = models.TextField(null =True, blank =True)
    created = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name