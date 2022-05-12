from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.conf import settings

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

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
        if self.action == "list":
            permission_classes = [permissions.IsAdminUser]
        elif self.action == "create" or self.action == "retrieve":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsSelf | permissions.IsAdminUser]

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
        serializer = RoomSerializer(user.favs.all(), many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)



class FavsView(APIView):
    # permission_classes = [IsAuthenticated,]
    def put(self, request):
        pk = request.data.get("pk", None)
        user = request.user
        if pk is not None:
            try:
                room = get_object_or_404(Room, pk=pk)
                if room in user.favs.all():
                    user.favs.remove(room)
                else:
                    user.favs.add(room)
                return Response(status=status.HTTP_200_OK)
            except Room.DoesNotExist:
                pass
        return Response(status=status.HTTP_400_BAD_REQUEST)

