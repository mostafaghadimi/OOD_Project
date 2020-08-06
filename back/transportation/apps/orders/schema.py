from graphene import ObjectType, Mutation
import graphene
from .models import Order
from graphene_django.types import DjangoObjectType
from apps.users.models import Customer
from apps.vehicles.models import Vehicle

class OrderType(DjangoObjectType):
    class Meta:
        model = Order

# class CustomerType(DjangoObjectType):
#     class Meta:
#         model = Customer

# class VehicleType(DjangoObjectType):
#     class Meta:
#         model = Vehicle

class Query(ObjectType):
    all_orders = graphene.List(
        OrderType,

    )

    def resolve_all_orders(self, info):
        return Order.Objects.all()