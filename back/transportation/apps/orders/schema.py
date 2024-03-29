from graphene import ObjectType, Mutation, InputObjectType
import graphene
from django.db.models import Avg
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError

from .models import Order
from apps.vehicles.schema import VehicleType, VehicleInput
from apps.users.schema import CustomerInput
from apps.users.models import Customer, Driver
from apps.vehicles.models import Vehicle


class OrderType(DjangoObjectType):
    class Meta:
        model = Order

class LocationType(DjangoObjectType):
    class Meta:
        model = Order
        fields = (
            "latitude",
            "longitude",
        )


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

    order_location = graphene.Field(
        LocationType,
        id=graphene.ID()
    )

    customer_orders = graphene.List(
        OrderType,
        id=graphene.ID()
    )


    def resolve_order_location(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")
        
        try:
            order = Order.objects.get(pk=id)
        
        except: 
            raise GraphQLError("Invalid Order ID")

        if user.is_superuser or user == order.owner:
            return order
        
        raise GraphQLError("You are not allowed to do this operation")

    def resolve_driver_load(self, info, id):
        user = info.context.user

        try:
            driver = Driver.objects.get(pk=id)

        except:
            raise GraphQLError("Driver not found")

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")
        
        elif user == driver.user or user.is_superuser:
            return driver.orders.all()

    def resolve_order(self, info, id):
        user = info.context.user
        
        if user.is_anonymous:
            raise GraphQLError("You need to login first!")
        
        try:
            order = Order.objects.get(pk=id)
            if order.owner == user or user.is_superuser:
                return order

            else:
                raise GraphQLError("You are not allowed to do this operation")
        except:
            raise GraphQLError("Order_id is not valid")

    def resolve_all_orders(self, info):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        if not user.is_superuser:
            raise GraphQLError("You are not allowed to do this operation")
        
        return Order.objects.all()

    def resolve_customer_orders(self, info, id):
        user = info.context.user

        try:
            customer = Customer.objects.get(pk=id)

        except:
            raise GraphQLError("Customer not found")

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")
        
        elif user == customer.user or user.is_superuser:
            return customer.orders.all()

class CreateOrder(Mutation):
    class Arguments:
        order_data = OrderInput()
        order_code = graphene.String(required=True)

    order = graphene.Field(OrderType)

    def mutate(self, info, order_code, order_data=None):

        user = info.context.user
        
        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        elif user.is_superuser:
            owner_id = order_data.owner_id
            try:
                owner = Customer.objects.get(pk=owner_id)
            except:
                raise GraphQLError("Invalid owner")

            
            order = Order(owner=owner)
            order.order_code = order_code
            order.destination_address = order_data.destination_address
            order.save()

            return CreateOrder(order=order)

        else:
            raise GraphQLError("Alchohol test required")

class AssignVehicleLoad(Mutation):
    class Arguments:
        order_id = graphene.ID(required=True)
        vehicle_id = graphene.ID(required=True)
        

    order = graphene.Field(OrderType)

    def mutate(self, info, order_id, vehicle_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        elif not user.is_superuser:
            raise GraphQLError("You are not allowed to do this opertaion")

        
        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)

        except:
            raise GraphQLError("Invalid vehicle ID")

        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise GraphQLError("Invalid order ID")

        vehicle.vehicle_status = '2'
        vehicle.duty_no += 1
        order.vehicle = vehicle

        order.save()
        vehicle.save()

        return AssignVehicleLoad(order=order)

class AssignDriverLoad(Mutation):
    class Arguments:
        driver_id = graphene.ID(required=True)
        order_id = graphene.ID(required=True)
    
    order = graphene.Field(OrderType)

    def mutate(self, info, driver_id, order_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        elif not user.is_superuser:
            raise GraphQLError("You are not allowed to do this opertaion")

        
        try:
            driver = Driver.objects.get(pk=driver_id)
        except:
            raise GraphQLError("Invalid driver ID")

        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise GraphQLError("Invalid order ID")

        
        driver.driver_status = '2'
        order.driver = driver

        order.save()
        driver.save()

        return AssignDriverLoad(order=order)


class EditOrder(Mutation):
    class Arguments:
        order_id = graphene.ID(required=True)
        owner_id = graphene.ID()
        order_code = graphene.String()
        driver_id = graphene.ID()
        vehicle_id = graphene.ID()
        is_load = graphene.Boolean()
        order_status = graphene.String()
        destination_address = graphene.String()
        transportation_cost = graphene.Float()


    order = graphene.Field(OrderType)

    def mutate(self, info, order_id, **kwargs):

        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        if not user.is_superuser:
            raise GraphQLError("You are not allowed to do this operation")
        
        order = Order.objects.get(pk=order_id)
        driver_id = kwargs.get('driver_id')
        vehicle_id = kwargs.get('vehicle_id')
        owner_id = kwargs.get('owner_id')
        order_code = kwargs.get('order_code')
        is_load = kwargs.get('is_load')
        order_status = kwargs.get('order_status')
        destination_address = kwargs.get('destination_address')
        transportation_cost = kwargs.get('transportation_cost')
        
        if driver_id:
            try:
                driver = Driver.objects.get(pk=owner_id)
                order.driver = driver

            except:
                raise GraphQLError("Invalid owner ID")
        
        if vehicle_id:
            try:
                vehicle = Vehicle.objects.get(pk=vehicle_id)
                order.vehicle = vehicle
                
            except:

                raise GraphQLError("Invalid Vehicle ID")

        if owner_id:
            try:
                owner = Customer.objects.get(pk=owner_id)
                order.owner = owner
            
            except:
                raise GraphQLError("Invalid Owner ID")

        order.is_load = is_load or order.is_load
        order.order_code = order_code or order.order_code
        order.order_status = order_status or order.order_status
        order.destination_address = destination_address or order.destination_address
        order.transportation_cost = transportation_cost or order.transportation_cost
        order.save()

        return EditOrder(order=order)

class DeleteOrder(Mutation):
    class Arguments:
        order_id = graphene.ID()

    id = graphene.ID()

    def mutate(self, info, order_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        if not user.is_superuser:
            raise GraphQLError("You are not allowed to do this operation")

        order = Order.objects.get(pk=order_id)
        order.delete()

        return DeleteOrder(id=order_id)

class UpdateOrderLocation(Mutation):
    class Arguments:
        latitude = graphene.Float(required=True)
        longitude = graphene.Float(required=True)
        order_id = graphene.ID(required=True)

    order = graphene.Field(OrderType)

    def mutate(self, info, latitude, longitude, order_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first")

        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise GraphQLError("Invalid order id")

        if user == order.owner:
            order.longitude = longitude
            order.latitude = latitude

            order.save()
            return UpdateOrderLocation(order=order)
        
        else:
            raise GraphQLError("You are not allowed to do this operation")


class VerifyDelivery(Mutation):
    class Arguments:
        order_id = graphene.ID(required=True)
        rate = graphene.Int()

    order = graphene.Field(OrderType)

    def mutate(self, info, order_id, rate=None):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")
        
        if not (user.is_customer or user.is_superuser):
            raise GraphQLError("You are not allowed to do this operation")
        
        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise GraphQLError("Invalid Order ID")

        if not (user == order.owner.user or user.is_superuser):
            raise GraphQLError("You are not allowed to do this operation")


        if not order.order_status == '3':
            raise GraphQLError("You cannot verify this order")

        order.order_status = '4'

        driver = order.driver
        driver.driver_status = '1'

        vehicle = order.vehicle
        vehicle.vehicle_status = '1'


        if rate:
            order.rating = rate
            order.save()
            driver.rating = driver.orders.filter(order_status='4').aggregate(Avg('rating'))['rating__avg']

        vehicle.save()
        driver.save()
        order.save()


        return VerifyDelivery(order=order)



class Mutation(ObjectType):
    create_order = CreateOrder.Field()
    delete_order = DeleteOrder.Field()
    edit_order = EditOrder.Field()

    assign_vehicle_load = AssignVehicleLoad.Field()
    assign_driver_load = AssignDriverLoad.Field()

    update_order_location = UpdateOrderLocation.Field()
    verify_delivery = VerifyDelivery.Field()