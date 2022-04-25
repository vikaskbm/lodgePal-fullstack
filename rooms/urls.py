from django.urls import path
from . import viewset
from rest_framework.routers import DefaultRouter

app_name = "rooms"

router = DefaultRouter()
router.register("", viewset.RoomViewSet, basename="rooms")


urlpatterns = router.urls
