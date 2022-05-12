from rest_framework import serializers

from rooms.models import Room
from users.serializers import UserSerializer


class RoomSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    is_fav =serializers.SerializerMethodField()
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
    
    def get_is_fav(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
            if user.is_authenticated:
                return obj in user.favs.all()
            return False
        return False

    def create(self, validated_data):
        user = self.context.get("request").user
        print(user)
        room = Room.objects.create(**validated_data, user=user)
        return room