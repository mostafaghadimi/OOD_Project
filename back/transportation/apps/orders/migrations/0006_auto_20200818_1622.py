# Generated by Django 3.0.8 on 2020-08-18 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rate',
            name='rating',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
