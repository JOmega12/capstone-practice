from django.urls import path 
from . import views

urlpatterns = [
    path('api/', views.getItem , name='notes'),
    path('api/create', views.createItem, name='create-item'),
    path('api/<int:pk>/update', views.updateItem, name='update-item'),
    path('api/<int:pk>/delete', views.deleteItem, name='delet-item'),
]