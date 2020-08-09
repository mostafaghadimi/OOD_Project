from graphene import ObjectType, Mutation, InputObjectType
import graphene
from .models import Order
from graphene_django.types import DjangoObjectType
from apps.vehicles.schema import VehicleType, VehicleInput
from apps.users.schema import CustomerInput
from apps.users.models import Customer


class OrderType(DjangoObjectType):
    class Meta:
        model = Order


class OrderInput(InputObjectType):
    owner_id = graphene.ID(required=True)
    destination_address = graphene.String()


class Query(ObjectType):
    all_orders = graphene.List(
        OrderType
    )

    def resolve_all_orders(self, info):
        return Order.Objects.all()

class CreateOrder(Mutation):
    class Arguments:
        order_data = OrderInput()

    order = graphene.Field(OrderType)

    def mutate(self, info, order_data=None):
        print('order_data', order_data)

        user = info.context.user
        
        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif user.is_customer or user.is_superuser:
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