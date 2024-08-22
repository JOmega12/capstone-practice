from django.urls import path 
from .views import NotesView, NotesDetailView

urlpatterns = [
    path('api/', NotesView.as_view(), name='notes'),
    path('api/<int:pk>/', NotesDetailView.as_view(), name='notes-detail')
]