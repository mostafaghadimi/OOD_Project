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


class CustomerType(DjangoObjectType):
    class Meta:
        model = Customer

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

class UserInput(InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    username = graphene.String()
    phone_no = graphene.String()
    password = graphene.String()

class DriverInput(InputObjectType):
    user = graphene.Field(UserInput)
    latitude = graphene.Float()
    longitude = graphene.Float()
    national_id = graphene.String()
    birthday = graphene.Date()


class AuthorizerInput(InputObjectType):
    user = graphene.Field(UserInput)
    phone_no = graphene.String()


class CustomerInput(InputObjectType):
    user = graphene.Field(UserInput)
    phone_no = graphene.String()
    birthday=graphene.Date()

class CreateDriver(Mutation):
    class Arguments:
        driver_data = DriverInput()
        
    driver = graphene.Field(DriverType)

    def mutate(self, info, driver_data=None):
        user = Usermodel (
            first_name=driver_data.user.first_name,
            last_name=driver_data.user.last_name,
            email=driver_data.user.email,
            username=driver_data.user.username,
            phone_no=driver_data.user.phone_no,
        )
        user.set_password(driver_data.user.password)
        user.save()

        driver = Driver(    
            user=user,    
            national_id=driver_data.national_id,
            birthday=driver_data.birthday,
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
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first.")
        
        if not user.is_superuser:
            raise Exception("You are not allowed to do this action")

        driver = Driver.objects.get(pk=id)

        user_id = driver.user.id
        user = Usermodel.objects.get(pk=user_id)
        user.first_name = driver_data.user.first_name
        user.last_name = driver_data.user.last_name
        user.email = driver_data.user.email
        user.username = driver_data.user.username
        user.phone_no = driver_data.user.phone_no
        user.set_password(driver_data.user.password)

        driver.national_id = driver_data.national_id
        driver.birthday = driver_data.birthday

        user.save()
        driver.save()

        return UpdateDriver(driver=driver)

class DeleteDriver(Mutation):
    # user = graphene.Field(UserType)
    id = graphene.ID()
    class Arguments:
        id = graphene.ID(required=True)
    
    def mutate(self, info, id):
        driver = Driver.objects.get(pk=id)
        user_id = driver.user.id
        Usermodel.objects.get(pk=user_id).delete()
        return DeleteDriver(id=id)
        

class VerifyDriver(Mutation):
    driver = graphene.Field(DriverType)

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


class DeleteAuthorizer(Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    
    id = graphene.ID()

    def mutate(self, info, id):
        authorizer = Authorizer.objects.get(pk=id)
        authorizer.delete()
        return DeleteAuthorizer(id=id)

class CreateCustomer(Mutation):
    class Arguments:
        customer_data = CustomerInput()

    customer = graphene.Field(CustomerType)

    def mutate(self, info, customer_data=None):
        customer = Customer (
            first_name=customer_data.first_name,
            last_name=customer_data.last_name,
            username=customer_data.username,
            email=customer_data.email,
            birthday=customer_data.birthday
        )

        customer.set_password(customer_data.password)
        customer.save()

        return CreateCustomer(customer=Customer)

class Mutations(ObjectType):
    create_driver = CreateDriver.Field()
    update_driver = UpdateDriver.Field()
    delete_driver = DeleteDriver.Field()
    verify_driver = VerifyDriver.Field()

    create_authorizer = CreateAuthorizer.Field()
    update_authorizer = UpdateAuthorizer.Field()
    delete_authorizer = DeleteAuthorizer.Field()

    create_customer = CreateCustomer.Field()