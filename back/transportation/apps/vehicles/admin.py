from django.contrib import admin
from .models import Vehicle

class VehicleAdmin(admin.ModelAdmin):
    list_display = [
        'plate_no',
        'vehicle_type',
        'vehicle_status',
        'duty_no',
        'max_capacity',
        'max_tolerable_weight',
    ]

admin.site.register(Vehicle, VehicleAdmin)