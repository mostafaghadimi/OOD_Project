from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Usermodel(AbstractUser, models.Model):
    phone_no = models.CharField(
        max_length=11,
        blank=True,
        verbose_name="Phone Number"
    )

    is_driver = models.BooleanField(
        default=False,
        verbose_name="Is Driver",
    )

    is_authorizer = models.BooleanField(
        default=False,
        verbose_name="Is Authorizer",
    )

    is_customer = models.BooleanField(
        default=False,
        verbose_name="Is Customer",
    )

    USERNAME_FIELD = "username"   # e.g: "username", "email"
    EMAIL_FIELD = "email"         # e.g: "email", "primary_email"
    
    def __str__(self):
        return self.username
    
class Driver(models.Model):
    user = models.OneToOneField(
        Usermodel,
        related_name="driver",
        on_delete=models.CASCADE,
    )
    
    is_verified = models.BooleanField(
        default=False,
        verbose_name="Is Verified"
    )

    national_id = models.CharField(
        max_length=10, 
        blank=True,
        null=True,
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

    birthday = models.DateField(
        null=True,
        verbose_name= "Birthday",
    )

    is_driver = models.BooleanField(
        default=True,
        verbose_name="Is Driver",
    )

    class Meta:
        verbose_name = 'Driver'
        verbose_name_plural = 'Drivers'

    def __str__(self):
        return self.user.username

class Authorizer(models.Model):
    user = models.OneToOneField(
        Usermodel,
        related_name="authorizer",
        on_delete=models.CASCADE,
    )

    is_authorizer = models.BooleanField(
        default=True,
        verbose_name="Is Authorizer",
    )

    class Meta:
        verbose_name = 'Authorizer'
        verbose_name_plural = 'Authorizers'

class Customer(models.Model):
    user = models.OneToOneField(
        Usermodel,
        related_name="customer",
        on_delete=models.CASCADE,
    )

    is_customer = models.BooleanField(
        default=True,
        verbose_name="Is Customer",
    )

    birthday = models.DateField(
        null=True,
        verbose_name= "Birthday",
    )
    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

class Administrator(models.Model):
    user = models.OneToOneField(
        Usermodel,
        related_name="administrator",
        on_delete=models.CASCADE,
    )
    
    class Meta:
        verbose_name='Adminsitrator'
        verbose_name_plural='Administrators'