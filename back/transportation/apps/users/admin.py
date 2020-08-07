from django.contrib import admin
from django.apps import AppConfig
from apps.users.models import Driver, Customer, Authorizer, Administrator, Usermodel

models = [
    Driver,
    Customer,
    Usermodel,
    Authorizer,
    Administrator,
]

admin.site.register(models)
