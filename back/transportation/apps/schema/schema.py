import graphene
from apps.users.schema import Query as UserQuery
from apps.users.schema import Mutations as UserMutation

class Query(UserQuery):
    pass

# class Mutations(UserMutation):
#     pass

schema = graphene.Schema(
    query=Query,
    
)