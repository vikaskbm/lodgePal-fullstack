from urllib import response
from black import WriteBack
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from rooms import serializers

from .models import User
from .serializers import ReadUserSerializer, WriteUserSerializer


class MeView(APIView):
    permission_classes = [IsAuthenticated,]
    
    def get(self, request):
        return Response(ReadUserSerializer(request.user).data)

    def put(self, request):
        serializer = WriteUserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    if user is not None:
        return Response(ReadUserSerializer(user).data)
    return Response(status=status.HTTP_404_NOT_FOUND)
 