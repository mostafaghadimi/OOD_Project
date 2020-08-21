import graphene
from graphql import GraphQLError
from graphene import Mutation, ObjectType, InputObjectType
from graphene_django.types import DjangoObjectType

from .models import Vehicle


class VehicleType(DjangoObjectType):
    class Meta:
        model = Vehicle

class VehicleInput(InputObjectType):
    vehicle_type = graphene.String()
    plate_no = graphene.String()
    vehicle_status = graphene.String()
    duty_no = graphene.Int()
    max_capacity = graphene.Float()
    max_tolerable_weight = graphene.Float()


class Query(ObjectType):
    vehicle = graphene.Field(
        VehicleType,
        id = graphene.ID()
    )

    all_vehicles = graphene.List(
        VehicleType
    )

    def resolve_vehicle(self, info, id):
        #todo only driver and admin can see. (and maybe customer)
        return Vehicle.objects.get(pk=id)
    
    def resolve_all_vehicles(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        elif not user.is_superuser:
            raise GraphQLError("You are not allowed to do this operation")

        return Vehicle.objects.all()

class CreateVehicle(Mutation):
    class Arguments:
        vehicle_data = VehicleInput()
    
    vehicle = graphene.Field(
        VehicleType
    )

    def mutate(self, info, vehicle_data=None):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError("You need to login first!")

        elif not user.is_superuser:
            raise GraphQLError("You are not allowed to do this operation")

        vehicle = Vehicle(
            **vehicle_data
        )
        vehicle.save()
        return CreateVehicle(vehicle=vehicle)

class Mutation(ObjectType):
    create_vehicle = CreateVehicle.Field()
    