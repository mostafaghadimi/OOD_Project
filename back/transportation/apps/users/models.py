from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
class Driver(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE
    )
    father_name = models.CharField(
        max_length=20, 
        blank=True, 
        verbose_name="Father's Name"
    )
    national_id = models.CharField(
        max_length=10, 
        blank=True, 
        verbose_name="National ID"
    )
    phone_no = models.CharField(
        max_length=11,
        blank=True,
        verbose_name="Phone Number"
    )
    birth_date = models.DateField(
        null=True, 
        blank=True
    )
    salary = models.FloatField(
        default=0
    )
    verified = models.BooleanField(
        default=False
    )

    # TODO: profile picture


    def __str__(self):
        return self.user.username + ' ' + self.user.last_name


@receiver(post_save, sender=User)
def create_driver(sender, instance, created, **kwargs):
    if created:
        Driver.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_driver(sender, instance, **kwargs):
    instance.driver.save()