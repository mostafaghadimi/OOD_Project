from django.db import models
from apps.users.models import Driver
from apps.vehicles.models import Vehicle

class Crash(models.Model):
    driver = models.ForeignKey(
        Driver, 
        related_name='crash',
        on_delete=models.CASCADE,
    )

    vehicle = models.ForeignKey(
        Vehicle,
        related_name='crash',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    description = models.TextField()

    crash_date = models.DateTimeField(
        auto_now_add=True, 
        blank=True,
    )

    class Meta:
        verbose_name="crash"
        verbose_name_plural="crashes"

    def __str__(self):
        return self.description