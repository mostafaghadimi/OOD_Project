from django.contrib import admin
from .models import Order

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

admin.site.register(Order, OrderAdmin)
