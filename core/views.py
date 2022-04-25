from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from rooms.models import Room

# Create your views here.
def list_rooms(request):
    rooms = Room.objects.all()
    data = serializers.serialize("json", rooms)
    response = HttpResponse(content=data)
    return response