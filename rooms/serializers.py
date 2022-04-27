from dataclasses import field
from email.policy import default
from tabnanny import check
from rest_framework import serializers

from rooms.models import Room
from users.serializers import RelatedUserSerializer


class RoomSerializer(serializers.ModelSerializer):
    user = RelatedUserSerializer() 
    class Meta:
        model = Room
        exclude = ("modified",)
        read_only_fields = ("id", "user", "created", "modified")

    def validate(self, data):
        if self.instance:
            check_in = data.get("check_in", self.instance.check_in)
            check_out = data.get("check_out", self.instance.check_out)
        else:
            check_in = data.get("check_in")
            check_out = data.get("check_out")

        if check_in == check_out:
            raise serializers.ValidationError('Not enough time between changes')
        return data