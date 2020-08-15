import graphene
from graphene import ObjectType, Mutation, InputObjectType
from graphene_django.types import DjangoObjectType

from .models import Crash
from apps.users.models import Driver

class CrashType(DjangoObjectType):
    class Meta:
        model = Crash

class CrashInput(InputObjectType):
    description = graphene.String()


class ReportCrash(Mutation):
    class Arguments:
        crash_data = CrashInput()
        id = graphene.ID()

    crash = graphene.Field(CrashType)

    def mutate(self, info, id, crash_data=None, **kwargs):
        user = info.context.user
        
        if user.is_anonymous:
            raise Exception('Login is needed for reporting crash')
        
        elif (user.is_driver and user == driver.user) or user.is_superuser:
            try:
                driver = Driver.objects.get(pk=id)

            except:
                raise Exception("driver not found")

            crash = Crash(
                driver = driver,
                description=crash_data.description,
            )
            crash.save()

            return ReportCrash(crash=crash)
        
        else:
            raise Exception("You are not allowed to do this operation")


class Query(ObjectType):
    all_crashes = graphene.List(
        CrashType
    )

    def resolve_all_crashes(self, info):
        user = info.context.user

        if user.is_anonymous:
            raise Exception("You need to login first!")

        elif user.is_superuser:
            return Crash.objects.all()

        else:
            raise Exception("You are not allowed to do this operation")


class Mutations(ObjectType):
    report_crash = ReportCrash.Field()