from dataclasses import field
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username", 
            "first_name", 
            "last_name", 
            "email",
            "avatar",
            "superhost" 
        )

        read_only_fields = ("id", "superhost", "avatar")
