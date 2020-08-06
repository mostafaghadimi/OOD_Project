import graphene

from graphene import Mutation, ObjectType, InputObjectType
from .models import Driver, Authorizer, Customer, Administrator, Usermodel
from graphene_django.types import DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = Usermodel

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

    all_drivers = graphene.List(
        DriverType
    )

    all_authorizers = graphene.List(
        AuthorizerType
    )

    me = graphene.Field(
        UserType
    )

    is_username_unique = graphene.Boolean(
        username=graphene.String()
    )

    unverified_drivers = graphene.List(
        DriverType
    )

    def resolve_unverified_drivers(self, info):
        return Driver.objects.filter(is_verified=False).all()

    def resolve_is_username_unique(self, info, username):
        try:
            User.objects.get(username=username)
            return False
        except:
            return True

    def resolve_me(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('You need to login first')
        
        return user

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


class AuthorizerInput(InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    username = graphene.String()
    phone_no = graphene.String()
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
        )
        driver.set_password(driver_data.password)
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
        driver.set_password(driver_data.password)
        driver.save()

        return UpdateDriver(driver=driver)

class DeleteDriver(Mutation):
    id = graphene.ID()
    class Arguments:
        id = graphene.ID(required=True)
    
    def mutate(self, info, id):
        driver = Driver.objects.get(pk=id)
        driver.delete()
        return DeleteDriver(id=id)

class VerifyDriver(Mutation):
    id = graphene.ID()

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        driver = Driver.objects.get(pk=id)
        driver.is_verified = True
        driver.save()

        return VerifyDriver(driver=driver)


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

    authorizer = graphene.Field(AuthorizerType)

    def mutate(self, info, authorizer_data=None):
        authorizer = Authorizer(
            first_name=authorizer_data.first_name,
            last_name=authorizer_data.last_name,
            email=authorizer_data.email,
            username=authorizer_data.username,
            phone_no=authorizer_data.phone_no,
        )
        authorizer.set_password(authorizer_data.password)
        authorizer.save()
        return CreateAuthorizer(authorizer=authorizer)

class UpdateAuthorizer(Mutation):
    class Arguments:
        id = graphene.ID()
        authorizer_data = AuthorizerInput()
    
    authorizer = graphene.Field(AuthorizerType)
    
    def mutate(self, info, id, authorizer_data=None):
        authorizer = Authorizer.objects.get(pk=id)
        authorizer.first_name = authorizer_data.first_name
        authorizer.last_name = authorizer_data.last_name
        authorizer.email = authorizer_data.email
        authorizer.username = authorizer_data.username
        authorizer.set_password(authorizer_data.password)
        authorizer.save()

        return UpdateAuthorizer(authorizer=authorizer)

class Mutations(ObjectType):
    create_driver = CreateDriver.Field()
    update_driver = UpdateDriver.Field()
    delete_driver = DeleteDriver.Field()
    verify_driver = VerifyDriver.Field()

    create_authorizer = CreateAuthorizer.Field()