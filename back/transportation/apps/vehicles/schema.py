from graphene import Mutation, ObjectType, InputObjectType
from graphene_django.types import DjangoObjectType
from .models import Vehicle
import graphene


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
        #todo only driver and admin can see
        return Vehicle.objects.all()



class Mutation(ObjectType):
    pass
