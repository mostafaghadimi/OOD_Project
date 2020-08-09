from graphene import ObjectType, Mutation, InputObjectType
import graphene
from .models import Order
from graphene_django.types import DjangoObjectType
from apps.vehicles.schema import VehicleType
from apps.users.schema import UserInput, CustomerType


class OrderType(DjangoObjectType):
    class Meta:
        model = Order


class OrderInput(InputObjectType):
    owner = graphene.Field(UserInput)
    vehicle = graphene.Field(VehicleInput)

class Query(ObjectType):
    all_orders = graphene.List(
        OrderType
    )

    def resolve_all_orders(self, info):
        return Order.Objects.all()

class CreateOrder(Mutation):
    class Arguments:
        order_data = OrderInput()

class Mutation(ObjectType):
    create_order = CreateOrder.Field()