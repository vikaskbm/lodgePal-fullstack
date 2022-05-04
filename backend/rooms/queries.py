from .models import Room
from .types import RoomListResponse
 
def resolve_rooms(root, info, page=1):
    if page < 0:
        page = 1

    page_size = 5
    start = page_size * (page-1)
    end = page_size * page
    
    arr = Room.objects.all()[start: end]
    total = Room.objects.count()
    return RoomListResponse(arr=arr, total=total)
    
def resolve_room(root, info, id):
    return Room.objects.get(id=id)