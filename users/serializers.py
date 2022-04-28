from asyncore import write
from dataclasses import field
from black import write_cache
from click import password_option
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = (
            "id",
            "username", 
            "first_name", 
            "last_name", 
            "email",
            "avatar",
            "superhost",
            "password"
        )

        read_only_fields = ("id", "superhost", "avatar")

    def create(self, validated_data):
        password = validated_data.get('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
