from django.shortcuts import render


from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from users.serializers import UserSerializer
from django.contrib.auth.models import User

# this encrypts the username
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
    
    return Response(routes)


@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data =request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = request.data['username'])