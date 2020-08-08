from django.contrib import admin
from django.apps import AppConfig
from apps.users.models import Driver, Customer, Authorizer, Usermodel

models = [
    Driver,
    Customer,
    Usermodel,
    Authorizer,
]

admin.site.register(models)
