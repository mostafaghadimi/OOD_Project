from django.db import models

class Vehicle(models.Model):
    VEHICLE_TYPES = [
        ('1', 'heavy car'),
        ('2', 'automobile')
    ]

    vehicle_type = models.CharField(
        max_length=1,
        default='1',
        choices=VEHICLE_TYPES,
        verbose_name='Vehicle Type'
    )

    plate_no = models.CharField(
        max_length=8,
        unique=True,
        null=True,
    )

    STATUS_CHOICE = [
        ('1', 'Free'),
        ('2', 'Busy'),
    ]

    vehicle_status = models.CharField(
        max_length=1,
        default='1',
        choices=STATUS_CHOICE,
        verbose_name='Vehicle Status',
    )

    duty_no = models.IntegerField(
        default=0,
        verbose_name="Number of Duty",
    )

    max_capacity = models.FloatField(
        default=0,
        verbose_name="Maximum Capacity",
    )

    max_tolerable_weight = models.FloatField(
        default=0,
        verbose_name="Max Tolerable Weight"
    )


    def __str__(self):
        return self.plate_no

