import graphene
from graphene import ObjectType

from apps.users.schema import Query as u


class Query(u, ObjectType):
    pass

schema = graphene.Schema(query=Query)