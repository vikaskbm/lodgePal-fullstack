import graphene
from graphene_django import DjangoObjectType
from .models import Room

class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType)

    def resolve_rooms(self, info):
        pass


class Mutation(graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
