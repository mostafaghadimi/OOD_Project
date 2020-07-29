# Generated by Django 3.0.5 on 2020-07-29 17:47

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('users', '0004_auto_20200729_1746'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usermodel',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phone_no', models.CharField(blank=True, max_length=11, verbose_name='Phone Number')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user', models.Model),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('usermodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='users.Usermodel')),
                ('national_id', models.CharField(blank=True, max_length=10, verbose_name='National ID')),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='')),
                ('status', models.CharField(choices=[('1', 'Free'), ('2', 'Busy')], max_length=1)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('users.usermodel', models.Model),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
