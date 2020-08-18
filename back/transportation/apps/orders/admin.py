from django.contrib import admin
from .models import Order, Rate

class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'owner',
        'driver',
        'vehicle',
        'is_load',
        'order_status',
        'transportation_cost',
        'destination_address',
    ]

class RateAdmin(admin.ModelAdmin):
    list_display = [
        'order',
        'owner',
        'rating',
    ]

admin.site.register(Order, OrderAdmin)
admin.site.register(Rate, RateAdmin)