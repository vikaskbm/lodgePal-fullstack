import graphene
from rooms import schema as room_schema


class Query(room_schema.Query, graphene.ObjectType):
    pass

class Mutation(graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
