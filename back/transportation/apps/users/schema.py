import graphene
from graphene import Mutation, ObjectType, InputObjectType
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


class DriverInput(InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    username = graphene.String()
    phone_no = graphene.String()
    national_id = graphene.String()
    password = graphene.String()

class CreateDriver(Mutation):
    class Arguments:
        driver_data = DriverInput()
        
    driver = graphene.Field(DriverType)

    def mutate(self, info, driver_data=None):
        driver = Driver(
            first_name=driver_data.first_name,
            last_name=driver_data.last_name,
            email=driver_data.email,
            username=driver_data.username,
            phone_no=driver_data.phone_no,
            national_id=driver_data.national_id,
            password=driver_data.password
        )

        driver.save()

        return CreateDriver(
            driver=driver
        )

# class UpdateDriver(Mutation):
#     class Arguments:
#         pass

class Mutations(ObjectType):
    create_driver = CreateDriver.Field()
    # update_driver = UpdateDriver.Field()
