from graphene import ObjectType, Mutation, InputObjectType
import graphene
from .models import Order
from graphene_django.types import DjangoObjectType
from apps.vehicles.schema import VehicleType, VehicleInput
from apps.users.schema import CustomerInput
from apps.users.models import Customer, Driver


class OrderType(DjangoObjectType):
    class Meta:
        model = Order


class OrderInput(InputObjectType):
    owner_id = graphene.ID(required=True)
    destination_address = graphene.String()


class Query(ObjectType):
    driver_load = graphene.List(
        OrderType,
        id=graphene.ID()
    )

    order = graphene.Field(
        OrderType,
        id=graphene.ID()
    )

    all_orders = graphene.List(
        OrderType
    )

    def resolve_driver_load(self, info, id):
        user = info.context.user

        try:
            driver = Driver.objects.get(pk=id)

        except:
            raise Exception("Driver not found")

        if user.is_anonymous:
            raise Exception("You need to login first!")
        
        elif user == driver.user or user.is_superuser:
            return driver.orders.all()

    def resolve_order(self, info, id):
        user = info.context.user
        
        if user.is_anonymous:
            raise Exception("You need to login first!")
        
        try:
            order = Order.objects.get(pk=id)
            if order.owner == user or user.is_superuser:
                return order

            else:
                raise Exception("You are not allowed to do this operation")
        except:
            raise Exception("Order_id is not valid")

    def resolve_all_orders(self, info):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser:
            raise Exception("You are not allowed to do this operation")
        
        return Order.objects.all()

class CreateOrder(Mutation):
    class Arguments:
        order_data = OrderInput()

    order = graphene.Field(OrderType)

    def mutate(self, info, order_data=None):

        user = info.context.user
        
        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif user.is_superuser:
            owner_id = order_data.owner_id
            try:
                owner = Customer.objects.get(pk=owner_id)
            except:
                raise Exception("Invalid owner")

            
            order = Order(owner=owner)
            order.destination_address = order_data.destination_address
            order.save()

            return CreateOrder(order=order)

        else:
            raise Exception("Alchohol test required")


class Mutation(ObjectType):
    create_order = CreateOrder.Field()