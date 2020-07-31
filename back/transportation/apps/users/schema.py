import graphene
from graphene import Mutation, ObjectType, InputObjectType
from .models import Driver, Authorizer, Customer, Administrator
from graphene_django.types import DjangoObjectType


class DriverType(DjangoObjectType):
    class Meta:
        model = Driver

class AuthorizerType(DjangoObjectType):
    class Meta:
        model = Authorizer

class Query(ObjectType):
    driver = graphene.Field(
        DriverType,
        id = graphene.ID()
    )

    authorizer = graphene.Field(
        AuthorizerType,
        id = graphene.ID()
    )

    all_drivers = graphene.List(DriverType)
    all_authorizers = graphene.List(AuthorizerType)

    def resolve_all_drivers(self, info, **kwargs):
        return Driver.objects.all()

    def resolve_driver(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Driver.objects.get(pk=id)

    def resolve_authorizer(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Driver.objects.get(pk=id)

    def resolve_all_authorizers(self, info, **kwargs):
        return Authorizer.objects.all()


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

class UpdateDriver(Mutation):
    class Arguments:
        id = graphene.ID()
        driver_data = DriverInput()
    
    driver = graphene.Field(DriverType)

    def mutate(self, info, id, driver_data=None):
        #TODO: Error handling if the id not exists
        driver = Driver.objects.get(pk=id)

        driver.first_name = driver_data.first_name
        driver.last_name = driver_data.last_name
        driver.email = driver_data.email
        driver.username = driver_data.username
        driver.phone_no = driver_data.phone_no
        driver.national_id = driver_data.national_id
        driver.password = driver_data.password
        driver.save()

        return UpdateDriver(driver=driver)


class AuthorizerInput(InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    username = graphene.String()
    phone_no = graphene.String()
    password = graphene.String()

class CreateAuthorizer(Mutation):
    class Arguments:
        authorizer_data = AuthorizerInput()

    authorizer = graphene.Field(AuthorizerInput)

    def mutate(self, info, authorizer_data=None):
        authorizer = Authorizer(
            firstname=authorizer_data.first_name,
            last_name=authorizer_data.last_name,
            email=authorizer_data.email,
            username=authorizer_data.username,
            phone_no=authorizer_data.phone_no,
            password=authorizer_data.password
        )
        authorizer.save()
        return CreateAuthorizer(authorizer=authorizer)

class Mutations(ObjectType):
    create_driver = CreateDriver.Field()
    update_driver = UpdateDriver.Field()
