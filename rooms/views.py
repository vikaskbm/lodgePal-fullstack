from django.http import QueryDict
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Room
from .serializers import RoomSerializer


class ListRoomView(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class SeeRoomView(RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer