from django.contrib import admin
from .models import Crash

class CrashAdmin(admin.ModelAdmin):
    list_display = [
        'crash_date',
        'driver',
        'description',
    ]

admin.site.register(Crash, CrashAdmin)