import graphene

from graphene import Mutation, ObjectType, InputObjectType
from .models import Driver, Authorizer, Customer, Usermodel
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
        id=graphene.ID(required=True)
    ) #done

    authorizer = graphene.Field(
        AuthorizerType,
        id=graphene.ID(required=True)
    ) #done

    customer = graphene.Field(
        CustomerType,
        id=graphene.ID(required=True)
    ) #done

    all_customers = graphene.List(
        CustomerType
    ) #done

    all_drivers = graphene.List(
        DriverType
    ) #done

    all_authorizers = graphene.List(
        AuthorizerType
    ) #done

    me = graphene.Field(
        UserType
    )

    is_username_unique = graphene.Boolean(
        username=graphene.String()
    )

    unverified_drivers = graphene.List(
        DriverType
    ) #done

    def resolve_customer(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You need to login first!")

        customer = Customer.objects.get(pk=id)
        if user.is_superuser or user==customer.user:
            return customer
        
        else:
            raise Exception("You are not allowed to do this operation")

    def resolve_all_customers(self, info):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser:
            raise Exception("You are not allowed to do this action")
        
        return Customer.objects.all()


    def resolve_unverified_drivers(self, info):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser or not user.is_authorizer:
            raise Exception("You are not allowed to do this action")

        return Driver.objects.filter(is_verified=False).all()

    def resolve_is_username_unique(self, info, username):
        try:
            Usermodel.objects.get(username=username)
            return False
        except:
            return True

    def resolve_me(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('You need to login first!')
        
        return user

    def resolve_all_drivers(self, info, **kwargs):
        user = info.context.user

        if not user.is_superuser:
            raise Exception("You are not allowed to do this action")

        return Driver.objects.all()

    def resolve_driver(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')

        if id is not None:
            driver = Driver.objects.get(pk=id)

            if user != driver.user:
                raise Exception("You are not allowed to do this action")

            return Driver.objects.get(pk=id)

    def resolve_authorizer(self, info, **kwargs):
        user = info.context.user
        id = kwargs.get('id')
        if id is not None:
            driver = Driver.objects.get(pk=id)
            if user != driver.user or not user.is_superuser:
                raise Exception("You are not allowed to do this action")

            return Driver.objects.get(pk=id)

    def resolve_all_authorizers(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser:
            raise Exception("You are not allowed to do this action")

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


class CustomerInput(InputObjectType):
    user = graphene.Field(UserInput)
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
            is_driver=True,
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
            raise Exception("You need to login first!")
        
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
    id = graphene.ID()
    class Arguments:
        id = graphene.ID(required=True)
    
    def mutate(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif user.is_authorizer or user.is_superuser:
            

            driver = Driver.objects.get(pk=id)
            user_id = driver.user.id
            Usermodel.objects.get(pk=user_id).delete()
            return DeleteDriver(id=id)
            
        raise Exception("You are not allowed to do this action")

class VerifyDriver(Mutation):
    driver = graphene.Field(DriverType)

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif user.is_authorizer or user.is_superuser:
            driver = Driver.objects.get(pk=id)
            driver.is_verified = True
            driver.save()
            return VerifyDriver(driver=driver)
        
        else:
            raise Exception("You are not allowed to do this action")


class CreateAuthorizer(Mutation):
    class Arguments:
        authorizer_data = AuthorizerInput()

    authorizer = graphene.Field(AuthorizerType)

    def mutate(self, info, authorizer_data=None):
        current_user = info.context.user
        if not current_user.is_superuser:
            raise Exception("You are not allowed to do this operation")

        user = Usermodel (
            first_name=authorizer_data.user.first_name,
            last_name=authorizer_data.user.last_name,
            email=authorizer_data.user.email,
            username=authorizer_data.user.username,
            phone_no=authorizer_data.user.phone_no,
        )

        user.set_password(authorizer_data.user.password)
        
        authorizer = Authorizer(
            user=user
        )

        user.save()
        authorizer.save()
        return CreateAuthorizer(authorizer=authorizer)

class UpdateAuthorizer(Mutation):
    class Arguments:
        id = graphene.ID()
        authorizer_data = AuthorizerInput()
    
    authorizer = graphene.Field(AuthorizerType)
    
    def mutate(self, info, id, authorizer_data=None):
        authorizer = Authorizer.objects.get(pk=id)
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You need to login first!")
        
        print(user.username, user.is_superuser)
        print(authorizer.user.username)
        if user == authorizer.user or user.is_superuser:
            authorizer.user.first_name = authorizer_data.user.first_name
            authorizer.user.last_name = authorizer_data.user.last_name
            authorizer.user.email = authorizer_data.user.email
            authorizer.user.username = authorizer_data.user.username
            authorizer.user.set_password(authorizer_data.user.password)

            authorizer.user.save()
            authorizer.save()

            return UpdateAuthorizer(authorizer=authorizer)
        else:
            raise Exception("You are not allowed to do this operation")


class DeleteAuthorizer(Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    
    id = graphene.ID()

    def mutate(self, info, id):
        user = info.context.user
        
        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser:
            raise Exception("You are not allowed to do this action")

        authorizer = Authorizer.objects.get(pk=id)
        authorizer.delete()
        return DeleteAuthorizer(id=id)

class CreateCustomer(Mutation):
    class Arguments:
        customer_data = CustomerInput()

    customer = graphene.Field(CustomerType)

    def mutate(self, info, customer_data=None):
        print(customer_data)
        user = Usermodel (
            first_name=customer_data.user.first_name,
            last_name=customer_data.user.last_name,
            username=customer_data.user.username,
            email=customer_data.user.email,
            phone_no=customer_data.user.phone_no
        )

        user.set_password(customer_data.user.password)

        customer = Customer (
            user=user,
            birthday=customer_data.birthday
        )

        user.save()
        customer.save()

        return CreateCustomer(customer=customer)

class UpdateCustomer(Mutation):
    class Arguments:
        customer_data = CustomerInput()

    customer = graphene.Field(CustomerType)

    def mutate(self, info, id, customer_data=None):
        customer = Customer.objects.get(pk=id)
        user_id = customer.user.id
        user = Usermodel.objects.get(pk=user_id)
        current_user = info.context.user
        if current_user.is_anonymous:
            raise Exception("You need to login first!")

        if user == current_user or current_user.is_superuser:
            customer.user.first_name = customer_data.user.first_name
            customer.user.last_name = customer_data.user.last_name
            customer.user.email = customer_data.user.email
            customer.user.set_password(customer_data.user.password)
            customer.user.save()
            customer.save()
            return UpdateCustomer(customer=customer)
        
        raise Exception("You are not allowed to do this operation")

class DeleteCustomer(Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    id = graphene.ID()

    def mutate(self, info, id):
        user = info.context.user
        customer = Customer.objects.get(pk=id)

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if user != customer.user:
            raise Exception("You are not allowed to do this operation")
        
        user_id = customer.user.id
        Usermodel.models.get(pk=user_id).delete()

        return DeleteCustomer(id=id)
        
        
class UpdateDriverStatus(Mutation):
    class Arguments:
        driver_id = graphene.ID(required=True)
        driver_status = graphene.String(required=True)

    driver = graphene.Field(DriverType)

    def mutate(self, info, driver_id, driver_status):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif not user.is_superuser:
            raise Exception("You are not allowed to do this operation")

        driver = Driver.objects.get(pk=driver_id)
        driver.driver_status = driver_status
        driver.save()
        
        return UpdateDriverStatus(driver=driver)


class Mutations(ObjectType):
    create_driver = CreateDriver.Field()
    update_driver = UpdateDriver.Field()
    delete_driver = DeleteDriver.Field()
    verify_driver = VerifyDriver.Field()
    update_driver_status = UpdateDriverStatus.Field()

    create_authorizer = CreateAuthorizer.Field()
    update_authorizer = UpdateAuthorizer.Field()
    delete_authorizer = DeleteAuthorizer.Field()

    create_customer = CreateCustomer.Field()
    update_customer = UpdateCustomer.Field()
    delete_customer = DeleteCustomer.Field()