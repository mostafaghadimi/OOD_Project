# Generated by Django 3.0.8 on 2020-08-21 16:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('vehicles', '0001_initial'),
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='driver',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='users.Driver', verbose_name='Driver'),
        ),
        migrations.AddField(
            model_name='order',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='users.Customer', verbose_name='Owner'),
        ),
        migrations.AddField(
            model_name='order',
            name='vehicle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to='vehicles.Vehicle', verbose_name='Vehicle'),
        ),
    ]