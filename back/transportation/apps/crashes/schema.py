import graphene
from graphene import ObjectType, Mutation, InputObjectType
from graphene_django.types import DjangoObjectType

from .models import Crash

class CrashType(DjangoObjectType):
    class Meta:
        model = Crash

class CrashInput(InputObjectType):
    description = graphene.String()


class ReportCrash(Mutation):
    class Arguments:
        crash_data = CrashInput()

    crash = graphene.Field(CrashType)

    def mutate(self, info, crash_data=None, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            raise Exception('Login is needed for reporting crash')
        
        crash = Crash(
            driver = user,
            description=crash_data.description,
        )
        crash.save()
        return ReportCrash(crash=crash)


class Query(ObjectType):
    all_crashes = graphene.List(
        CrashType
    )


class Mutations(ObjectType):
    report_crash = ReportCrash.Field()