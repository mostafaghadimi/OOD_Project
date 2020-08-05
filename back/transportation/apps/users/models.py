from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Usermodel(AbstractUser, models.Model):
    phone_no = models.CharField(
        max_length=11,
        blank=True,
        verbose_name="Phone Number"
    )

    USERNAME_FIELD = "username"   # e.g: "username", "email"
    EMAIL_FIELD = "email"         # e.g: "email", "primary_email"
    
    def __str__(self):
        return self.username

    
class Driver(Usermodel, models.Model):
    is_verified = models.BooleanField(
        default=False,
        verbose_name="Is Verified"
    )

    national_id = models.CharField(
        max_length=10, 
        blank=True, 
        verbose_name="National ID"
    )

    profile_picture = models.ImageField(
        blank=True,
        null=True,
        upload_to="./static/profile_pictures",
        verbose_name="Profile Picture"
    )

    STATUS_CHOICES = [
        ('1', 'Free'),
        ('2', 'Busy')
    ]

    driver_status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default='1',
        verbose_name="Driver Status"
    )

    rating = models.FloatField(
        default=-1,
        verbose_name="Rating"
    )

    ranking = models.IntegerField(
        default=-1,
        verbose_name="Ranking"
    )

    latitude = models.FloatField(
        default=-1,
        verbose_name="Latitude"
    )

    longitude = models.FloatField(
        default=-1,
        verbose_name="Longitude"
    )

    class Meta:
        verbose_name = 'Driver'
        verbose_name_plural = 'Drivers'

class Authorizer(Usermodel, models.Model):
    class Meta:
        verbose_name = 'Authorizer'
        verbose_name_plural = 'Authorizers'

class Customer(Usermodel, models.Model):
    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

class Administrator(Usermodel, models.Model):
    class Meta:
        verbose_name='Adminsitrator'
        verbose_name_plural='Administrators'