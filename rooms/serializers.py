from rest_framework import serializers

from rooms.models import Room
from users.serializers import UserSerializer


class RoomSerializer(serializers.ModelSerializer):
    user = UserSerializer() 
    class Meta:
        model = Room
        exclude = ("modified")