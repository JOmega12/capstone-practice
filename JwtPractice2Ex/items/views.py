from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework import status


class NotesView(APIView):
    def get(self, request):
        item = Item.objects.all().order_by('-created')
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        item = Item.objects.create(body=data['body'])
        serializer = ItemSerializer(item, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    
class NotesDetailView(APIView):
    def get(self, request, pk):
        item = Item.objects.get(id= pk)
        serializer =ItemSerializer(item, many=False)
        return Response(serializer.data)
    
    def put(self, request, pk):
        item = Item.objects.get(id=pk)
        serializer = ItemSerializer(instance = item, data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = Item.objects.get(id = pk)
        item.delete()
        return Response("Item Deleted!", status= status.status.HTTP_204_NO_CONTENT)    