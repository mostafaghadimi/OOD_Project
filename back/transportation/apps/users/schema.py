import graphene
from graphene import Mutation, ObjectType
from .models import Driver, Authorizer, Customer, Administrator
from graphene_django.types import DjangoObjectType


class DriverType(DjangoObjectType):
    class Meta:
        model = Driver

class Query(ObjectType):
    driver = graphene.Field(
        DriverType,
        id = graphene.ID()
    )

    all_drivers = graphene.List(DriverType)

    def resolve_all_drivers(self, info, **kwargs):
        return Driver.objects.all()

    def resolve_driver(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Driver.objects.get(pk=id)


# class CreateDriver(Mutation):
#     class Arguments:
#         first_name = graphene.String()
#         last_name = graphene.String()
#         email = graphene.String()
#         username = graphene.String()
#         phone_no = graphene.String()
#         national_id = graphene.String()
        
#     driver = graphene.Field(DriverType)

#     def mutate(self, info, first_name, last_name, email, username, phone_no, national_id):
#         return CreateDriver(
#             first_name,
#             last_name,
#             email,
#             username,
#             phone_no,
#             national_id
#         )


# class Mutations(ObjectType):
#     create_driver = CreateDriver.Field()