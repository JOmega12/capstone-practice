from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, ProfileView, NotesView

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', ProfileView.as_view(), name='get_profile'),
    path('api/notes/', NotesView.as_view(), name='get_notes'),
]


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, Note
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, ProfileSerializer, NoteSerializer

# Token Obtain View
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Register User
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Profile View (GET and PUT)
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Notes View (GET)
class NotesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        public_notes = Note.objects.filter(is_public=True).order_by('-updated')[:10]
        user_notes = request.user.notes.all().order_by('-updated')[:10]
        notes = public_notes | user_notes
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)