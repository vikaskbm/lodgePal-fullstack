from django.db import router
from rest_framework.routers import DefaultRouter
from django.urls import path

from . import views

app_name = "rooms"
router = DefaultRouter()
router.register("", views.RoomViewSet)

urlpatterns = router.urls