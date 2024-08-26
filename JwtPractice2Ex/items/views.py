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
    items = user.item_set.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)
