from django.db import models

# from users.models import CustomUser

# Create your models here.

class Item(models.Model):
    # user= models.ForeignKey(CustomUser,  on_delete=models.CASCADE, null=True, blank=True, related_name='items')
    name = models.CharField(max_length=20)
    body = models.TextField(null =True, blank =True)
    created = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name