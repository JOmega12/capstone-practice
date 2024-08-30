from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Item
from .serializers import ItemSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getItem(request):
    user = request.user
    items = user.items.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createItem(request):
    user = request.user
    data = request.data
    
    serializer = ItemSerializer(data = data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status= status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateItem(request, pk):
    try:
        item = Item.objects.get(pk=pk, user= request.user)

    except Item.DoesNotExist:
        Response({"error": "Item is not found or no permissions"})

    serializer = ItemSerializer(item, data = request.data, partial = True)
    if(serializer.is_valid()):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteItem(request, pk):
    try:
        item = Item.objects.get(pk =pk, user = request.user)
    except Item.DoesNotExist:
        return Response({"error": "item not found or no permission"}, status = status.HTTP_404_NOT_FOUND)
    
    item.delete()
    return Response({"Message": "Item Deleted Successfully :D"}, status = status.HTTP_204_OK)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
