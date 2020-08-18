from django.contrib import admin
from .models import Order

class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'owner',
        'driver',
        'vehicle',
        'is_load',
        'order_status',
        'transportation_cost',
        'destination_address',
        'rating',
    ]


admin.site.register(Order, OrderAdmin)