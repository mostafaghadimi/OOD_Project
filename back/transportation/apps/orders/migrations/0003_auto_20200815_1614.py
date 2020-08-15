# Generated by Django 3.0.8 on 2020-08-15 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_order_driver'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='latitude',
            field=models.FloatField(default=-1),
        ),
        migrations.AddField(
            model_name='order',
            name='longitude',
            field=models.FloatField(default=-1),
        ),
    ]