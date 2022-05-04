import graphene
from graphene_django import DjangoObjectType
from .models import Room

class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class RoomListResponse(graphene.ObjectType):
    arr = graphene.List(RoomType)
    total = graphene.Int()


class Query():
    rooms = graphene.Field(RoomListResponse, page=graphene.Int())

    def resolve_rooms(self, info, page=1):
        page_size = 5
        start = page_size * (page-1)
        end = page_size * page
        
        arr = Room.objects.all()[start: end]
        total = Room.objects.count()
        return RoomListResponse(arr=arr, total=total)


class Mutation(graphene.ObjectType):
    pass    
