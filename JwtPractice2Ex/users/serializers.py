from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

# from items.serializers import ItemSerializer
# from .models import CustomUser
# from items.models import Item
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(
#         write_only=True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only=True, required=True)
    
#     class Meta: 
#         model = CustomUser
#         fields = ('username', 'password', 'password2')
        
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError(
#                 {"password": "Password fields didn't match."}
#             )
#         return attrs
            
#     def create(self, validated_data):
#         user = CustomUser.objects.create(
#             username = validated_data['username'],
#             is_active=True
#             )
#         user.set_password(validated_data['password'])
#         user.save()
        
#         return user
