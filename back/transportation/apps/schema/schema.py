import graphene
import graphql_jwt

from apps.users.schema import Query as user_query
from apps.users.schema import Mutations as user_mutation


class Query(user_query, graphene.ObjectType):
    pass


class Mutations(user_mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()    

schema = graphene.Schema(
    query=Query,
    mutation=Mutations
)