import graphene
from graphene import ObjectType

from apps.users.schema import Query as user_query
from apps.orders.schema import Query as order_query

from apps.orders.schema import Mutation as order_mutation

class Query(user_query, order_query, ObjectType):
    pass

class Mutation(order_mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)