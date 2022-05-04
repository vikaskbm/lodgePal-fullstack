from typing_extensions import Required
import graphene

from .types import RoomListResponse, RoomType

from .models import Room


class Query():
    rooms = graphene.Field(RoomListResponse, page=graphene.Int())
    room = graphene.Field(RoomType, id=graphene.Int(required=True))

    def resolve_rooms(self, info, page=1):
        if page < 0:
            page = 1

        page_size = 5
        start = page_size * (page-1)
        end = page_size * page
        
        arr = Room.objects.all()[start: end]
        total = Room.objects.count()
        return RoomListResponse(arr=arr, total=total)
        
    def resolve_room(self, info, id):
        return Room.objects.get(id=id)


class Mutation(graphene.ObjectType):
    pass    
