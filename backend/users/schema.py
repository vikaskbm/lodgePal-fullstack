import graphene

from .types import UserType
from .models import User


class Query:
    user = graphene.Field(UserType, id=graphene.Int())

    def resolve_user(self, info, id):
        return User.objects.get(id=id)

class Mutation:
    pass