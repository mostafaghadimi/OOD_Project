from django.contrib import admin
from django.apps import AppConfig
from apps.users.models import Driver, Customer, Authorizer, Administrator

models = [
    Driver,
    Customer,
    Authorizer,
    Administrator,
]

admin.site.register(models)
