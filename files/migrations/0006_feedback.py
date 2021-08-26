# Generated by Django 3.2.5 on 2021-08-07 10:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('files', '0005_file_author'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedBack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='email address')),
                ('first_name', models.CharField(max_length=100)),
                ('message', models.CharField(max_length=2000)),
                ('last_name', models.CharField(max_length=100)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='feedback', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
