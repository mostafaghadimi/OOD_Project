# Generated by Django 3.0.8 on 2020-08-07 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200807_2250'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='is_driver',
            field=models.BooleanField(default=True, verbose_name='Is Driver'),
        ),
    ]
