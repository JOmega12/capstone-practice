from django.urls import path 
from . import views

urlpatterns = [
    path('api/', views.getItem , name='notes'),
    # path('api/<int:pk>/', NotesDetailView.as_view(), name='notes-detail')
]