from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Usermodel(User, models.Model):
    phone_no = models.CharField(
        max_length=11,
        blank=True,
        verbose_name="Phone Number"
    )

    def __str__(self):
        return self.username

    
class Driver(Usermodel, models.Model):
    national_id = models.CharField(
        max_length=10, 
        blank=True, 
        verbose_name="National ID"
    )

    profile_picture = models.ImageField(
        blank=True,
        null=True
    )

    STATUS_CHOICES = [
        ('1', 'Free'),
        ('2', 'Busy')
    ]

    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES
    )

    rating = models.FloatField(
        default=-1
    )

    ranking = models.IntegerField(
        default=-1
    )

    class Meta:
        verbose_name = 'Driver'
        verbose_name_plural = 'Drivers'

class Authorizer(User, models.Model):
    class Meta:
        verbose_name = 'Authorizer'
        verbose_name_plural = 'Authorizers'

class Customer(User, models.Model):
    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

class Administrator(User, models.Model):
    class Meta:
        verbose_name='Adminsitrator'
        verbose_name_plural='Administrators'