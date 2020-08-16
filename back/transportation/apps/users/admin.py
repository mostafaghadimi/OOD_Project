from django.contrib import admin
from django.apps import AppConfig
from apps.users.models import Driver, Customer, Authorizer, Usermodel

models = [
    Driver,
    Customer,
    Authorizer,
]

class UsermodelAdmin(admin.ModelAdmin):
    list_display = [
        'first_name',
        'last_name',
        'username',
        'email',
        'phone_no',
        'last_login',
        'is_driver',
        'is_authorizer',
        'is_customer',
        'is_superuser',
    ]

class DriverAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'is_verified',
        'national_id',
        # 'profile_picture',
        'driver_status',
        'birthday',
    ]

class CustomerAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'birthday',
    ]

class AuthorizerAdmin(admin.ModelAdmin):
    list_display = [
        'user',
    ]




admin.site.register(Usermodel, UsermodelAdmin)
admin.site.register(Driver, DriverAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Authorizer, AuthorizerAdmin)