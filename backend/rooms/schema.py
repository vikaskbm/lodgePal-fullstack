import graphene

from .types import RoomListResponse

from .models import Room


class Query():
    rooms = graphene.Field(RoomListResponse, page=graphene.Int())

    def resolve_rooms(self, info, page=1):
        if page < 0:
            page = 1

        page_size = 5
        start = page_size * (page-1)
        end = page_size * page
        
        arr = Room.objects.all()[start: end]
        total = Room.objects.count()
        return RoomListResponse(arr=arr, total=total)


class Mutation(graphene.ObjectType):
    pass    
