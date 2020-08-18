import graphene
from graphene import ObjectType, Mutation, InputObjectType
from graphene_django.types import DjangoObjectType

from .models import Crash
from apps.users.models import Driver, Usermodel
from apps.vehicle.models import Vehicle

class CrashType(DjangoObjectType):
    class Meta:
        model = Crash

class CrashInput(InputObjectType):
    description = graphene.String()


class ReportCrash(Mutation):
    class Arguments:
        crash_data = CrashInput()
        driver_id = graphene.ID()
        vehicle_id = graphene.ID()

    crash = graphene.Field(CrashType)

    def mutate(self, info, id, crash_data=None, **kwargs):
        user = info.context.user
        
        if user.is_anonymous:
            raise Exception('Login is needed for reporting crash')
        
        try:
            driver = Usermodel.objects.get(pk=id).driver
        except:
            raise Exception("Invalid Driver/User ID")

        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except:
            raise Exception("Invalid Vehicle ID")


        if (user.is_driver and user == driver.user) or user.is_superuser:

            driver.driver_status = "3"
            vehicle.vehicle_status = "3"

            crash = Crash(
                driver = driver,
                vehicle=vehicle,
                description=crash_data.description,
            )

            driver.save()
            crash.save()

            return ReportCrash(crash=crash)
        
        else:
            raise Exception("You are not allowed to do this operation")


class Query(ObjectType):
    crash = graphene.Field(
        crashType,
        id=graphene.ID(required=True),
    )
    all_crashes = graphene.List(
        CrashType
    )

    def resolve_crash(self, info, id):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")
        
        try:
            crash = Crash.objects.get(pk=id)
        except:
            raise Exception("Invalid Crash ID")

        if user.is_superuser:
            return crash

    def resolve_all_crashes(self, info):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        if user.is_superuser:
            return Crash.objects.all()

        
        raise Exception("You are not allowed to do this operation")


class Mutations(ObjectType):
    report_crash = ReportCrash.Field()