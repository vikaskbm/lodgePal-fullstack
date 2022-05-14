from cmath import pi
from copyreg import constructor
from multiprocessing import context
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.conf import settings

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

import jwt

from rooms.serializers import RoomSerializer
from rooms.models import Room

from .permissions import IsSelf
from .models import User
from .serializers import UserSerializer


class UsersViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        print(self.action)
        if self.action == "list":
            permission_classes = [permissions.IsAdminUser]
        elif self.action == "create" or self.action == "retrieve" or self.action == "favs":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsSelf]

        return [permission() for permission in permission_classes]

    @action(detail=False, methods = ['post'])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        print(user)
        if user:
            encoded_jwt = jwt.encode(
                {"pk": user.pk},
                settings.SECRET_KEY,
                algorithm="HS256"
            )
            return Response(data={"id": user.id, "token": encoded_jwt}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=True)
    def favs(self, request, pk):
        user = self.get_object()
        serializer = RoomSerializer(user.favs.all(), many=True, context={'request': request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    @favs.mapping.put
    def toggle_favs(self, request, pk):
        pk = request.data.get("pk", None)
        user = self.get_object()
        if pk is not None:
            try:
                print(user)
                room = get_object_or_404(Room, pk=pk)
                if room in user.favs.all():
                    user.favs.remove(room)
                else:
                    user.favs.add(room)
                return Response(status=status.HTTP_200_OK)
            except Room.DoesNotExist:
                pass
        return Response(status=status.HTTP_400_BAD_REQUEST)