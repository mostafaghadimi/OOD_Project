import graphene
from graphene_django.types import DjangoObjectType

from .models import UserModel

class UserType(DjangoObjectType):
    class Meta:
        model = UserModel

class Query(object):
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        return UserModel.objects.all()