import graphene
from graphene import Mutation, ObjectType
from graphene_django.types import DjangoObjectType

from .models import Order



class OrderType(DjangoObjectType):
    class Meta():
        model = Order

class Query(object):
    all_orders = graphene.List(OrderType)


    def resolve_all_orders(self, info, **kwargs):
        return Order.objects.all()

class CreateOrder(Mutation):
    id = graphene.ID()
    order_status = graphene.Int()
    order_info = graphene.String()
    transportation_cost = graphene.Float()
    delivery_status = graphene.Boolean()
    source_address = graphene.String()
    destination_address = graphene.String()
    weight = graphene.Float()

    class Arguments:
        order_status = graphene.Int()
        order_info = graphene.String()
        transportation_cost = graphene.Float()
        delivery_status = graphene.Boolean()
        source_address = graphene.String()
        destination_address = graphene.String()
        weight = graphene.Float()

    def mutate(self, info, order_status, order_info, transportation_cost, delivery_status, source_address, destination_address, weight):
        order = Order(
            order_status=order_status,
            order_info=order_info,
            transportation_cost=transportation_cost,
            delivery_status=delivery_status,
            source_address=source_address,
            destination_address=destination_address,
            weight=weight
        )
        order.save()
        return CreateOrder(
            id = order.id,
            order_status=order_status,
            order_info=order_info,
            transportation_cost=transportation_cost,
            delivery_status=delivery_status,
            source_address=source_address,
            destination_address=destination_address,
            weight=weight
        )

class Mutation(ObjectType):
    create_order = CreateOrder.Field()

