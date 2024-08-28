from django.shortcuts import render


from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from users.serializers import UserSerializer
from django.contrib.auth.models import User

from rest_framework import status


from rest_framework_simplejwt.tokens import RefreshToken


# this encrypts the username
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
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
        user = serializer.save()
        # user = User.objects.get(username = request.data['username'])
        # user = User(
        #     username=user_data['username']
        # )
        user.set_password(request.data['password'])
        user.is_active = True
        user.save()
        # token = Token.objects.create(user=user)
        
        refresh = RefreshToken.for_user(user)
        refresh['username']= user.username
        refresh['password']= user.password
        access_token = str(refresh.access_token)
        
        return Response({
            'refresh': str(refresh),
            'access': access_token
        }, status= status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)