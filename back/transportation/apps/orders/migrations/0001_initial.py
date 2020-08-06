# Generated by Django 3.0.8 on 2020-08-06 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_load', models.BooleanField(default=False, verbose_name='Is Load')),
                ('order_status', models.CharField(choices=[('1', 'submited'), ('2', 'loading'), ('3', 'sending'), ('4', 'delivered')], default='1', max_length=1, verbose_name='Order Status')),
                ('destination_address', models.TextField(null=True, verbose_name='Destination Address')),
                ('transportation_cost', models.FloatField(default=0, null=True, verbose_name='Transportation Cost')),
            ],
        ),
    ]
