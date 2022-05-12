from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import permissions

from .permissions import IsOwner
from .models import Room
from .serializers import RoomSerializer

class RoomViewSet(ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [permissions.AllowAny]
        elif self.action == "create":
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsOwner]
        
        return [permission() for permission in permission_classes]

    @action(detail=False)
    def search(self, request):
        max_price = request.GET.get('max_price', None)
        min_price = request.GET.get('min_price', None)
        beds = request.GET.get('beds', None)
        bedrooms = request.GET.get('bedrooms', None)
        bathrooms = request.GET.get('bathrooms', None)
        lat = request.GET.get('lat', None)
        lng = request.GET.get('lng', None)
        filter_kwargs = {}
        if max_price:
            filter_kwargs["price__lte"] = max_price
        if min_price:
            filter_kwargs["price__gte"] = min_price
        if beds:
            filter_kwargs["beds__gte"] = beds
        if bedrooms:
            filter_kwargs["bedrooms__gte"] = bedrooms
        if bathrooms:
            filter_kwargs["bathrooms__gte"] = bathrooms
        if lat and lng:
            filter_kwargs["lat__gte"] = float(lat) - 0.005
            filter_kwargs["lat__lte"] = float(lat) + 0.005
            filter_kwargs["lng__gte"] = float(lng) - 0.005
            filter_kwargs["lng__lte"] = float(lng) + 0.005
        

        try:
            rooms = Room.objects.filter(**filter_kwargs)
        except ValueError: 
            rooms = Room.objects.all()
        
        paginator = self.paginator
        results = paginator.paginate_queryset(rooms.order_by("-id"), request)
        serializer = RoomSerializer(results, many=True)
        return paginator.get_paginated_response(serializer.data)