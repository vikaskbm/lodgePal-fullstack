from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import ReadUserSerializer


class MeView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response(ReadUserSerializer(request.user).data)

    def put(self, request):
        pass

@api_view(["GET"])
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    if user is not None:
        return Response(ReadUserSerializer(user).data)
    return Response(status=status.HTTP_404_NOT_FOUND)
 