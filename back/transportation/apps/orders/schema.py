from graphene import ObjectType, Mutation, InputObjectType
import graphene
from .models import Order
from graphene_django.types import DjangoObjectType
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

    def resolve_order_location(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")
        
        try:
            order = Order.objects.get(pk=id)
        
        except: 
            raise Exception("Invalid Order ID")

        if user.is_superuser or user == order.owner:
            return order
        
        raise Exception("You are not allowed to do this operation")

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
        order_code = graphene.String(required=True)

    order = graphene.Field(OrderType)

    def mutate(self, info, order_code, order_data=None):

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
            order.order_code = order_code
            order.destination_address = order_data.destination_address
            order.save()

            return CreateOrder(order=order)

        else:
            raise Exception("Alchohol test required")

class AssignVehicleLoad(Mutation):
    class Arguments:
        order_id = graphene.ID(required=True)
        vehicle_id = graphene.ID(required=True)
        

    order = graphene.Field(OrderType)

    def mutate(self, info, order_id, vehicle_id):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif not user.is_superuser:
            raise Exception("You are not allowed to do this opertaion")

        
        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)

        except:
            raise Exception("Invalid vehicle ID")

        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise Exception("Invalid order ID")

        vehicle.vehicle_status = '2'
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
            raise Exception("You need to login first!")

        elif not user.is_superuser:
            raise Exception("You are not allowed to do this opertaion")

        
        try:
            driver = Driver.objects.get(pk=driver_id)
        except:
            raise Exception("Invalid driver ID")

        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise Exception("Invalid order ID")

        
        driver.driver_status = '2'
        order.driver = driver

        order.save()
        driver.save()

        return AssignDriverLoad(order=order)


class EditOrder(Mutation):
    class Arguments:
        order_data = OrderInput(required=True)
        order_id = graphene.ID(required=True)
        order_code = graphene.String()
        driver_id = graphene.ID()
        vehicle_id = graphene.ID()
        is_load = graphene.Boolean()
        order_status = graphene.String()
        destination_address = graphene.String()
        transportation_cost = graphene.Float()


    order = graphene.Field(OrderType)

    def mutate(self, info, order_id, order_code, is_load, order_status, destination_address, transportation_cost):

        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser:
            raise Exception("You are not allowed to do this operation")
        
        order = Order.objects.get(pk=order_id)
        driver_id = kwargs.get('driver_id')
        vehicle_id = kwargs.get('vehicle_id')
        
        if driver_id:
            try:
                driver = Driver.objects.get(pk=owner_id)
                order.driver = driver

            except:
                raise Exception("Invalid owner ID")
        
        if vehicle_id:
            try:
                vehicle = Vehicle.objects.get(pk=vehicle_id)
                order.vehicle = vehicle
                
            except:
                raise Exception("Invalid Vehicle ID")

        order.is_load = is_load
        order.order_code = order_code
        order.order_status = order_status
        order.destination_address = destination_address 
        order.transportation_cost = transportation_cost
        order.save()

        return EditOrder(order=order)

class DeleteOrder(Mutation):
    class Arguments:
        order_id = graphene.ID()

    id = graphene.ID()

    def mutate(self, info, order_id):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if not user.is_superuser:
            raise Exception("You are not allowed to do this operation")

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
            raise Exception("You need to login first")

        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise Exception("Invalid order id")

        if user == order.owner:
            order.longitude = longitude
            order.latitude = latitude

            order.save()
            return UpdateOrderLocation(order=order)
        
        else:
            raise Exception("You are not allowed to do this operation")


class VerifyDelivery(Mutation):
    class Arguments:
        order_id = graphene.ID(required=True)
        rate = graphene.Int()

    order = graphene.Field(OrderType)

    def mutate(self, info, order_id, rate=None):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")
        
        if not user.is_customer:
            raise Exception("You are not allowed to do this operation")
        
        try:
            order = Order.objects.get(pk=order_id)
        except:
            raise Exception("Invalid Order ID")

        if not user == order.owner.user:
            raise Exception("You are not allowed to do this operation")


        if not order.order_status == '3':
            raise Exception("You cannot verify this order")

        driver_id = order.driver.id
        driver = Driver.objects.get(pk=driver_id)
        driver.driver_status = '1'

        vehicle_id = order.vehicle.id
        vehicle = Vehicle.objects.get(pk=vehicle_id)
        vehicle.vehicle_status = '1'

        if rate:
            order.rating = rate

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