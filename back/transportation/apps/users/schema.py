import graphene
from graphene import Mutation, Argument
from graphene_django.types import DjangoObjectType

from .models import Driver

class DriverType(DjangoObjectType):
    class Meta:
        model = Driver

class Query(object):
    all_drivers = graphene.List(DriverType)

    def resolve_all_drivers(self, info, **kwargs):
        return Driver.objects.all()



# class CreateDriver(Mutation):
#     driver = graphene.Field(DriverType)
    
#     class Argument():

