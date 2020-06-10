from django.db import models
from django.utils.translation import gettext_lazy as _


ORDER_STATUS_CHOICES = [
    (1, "ثبت شده"),
    (2, "در حال بارگیری"),
    (3, "فرستاده شده"),
    (4, "تحویل داده شده")
]

class Order(models.Model):
    order_status = models.CharField(
        max_length=1,
        choices=ORDER_STATUS_CHOICES,
        default=1,
        verbose_name="order status"
    )

    order_info = models.TextField(
        verbose_name="order info"
    )

    transportation_cost = models.FloatField(
        default=0,
        verbose_name="transportation cost"
    )

    delivery_status = models.BooleanField(
        default=False,
        verbose_name="delivery status"
    )

    source_address = models.TextField(
        verbose_name="source address"
    )

    destination_address = models.TextField(
        verbose_name="destination address"
    )

    weight = models.FloatField(
        verbose_name="order weight",
        default=0
    )