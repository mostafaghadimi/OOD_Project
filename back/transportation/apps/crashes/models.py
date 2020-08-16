from django.db import models
from apps.users.models import Driver

class Crash(models.Model):
    driver = models.ForeignKey(
        Driver, 
        related_name='crashes',
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