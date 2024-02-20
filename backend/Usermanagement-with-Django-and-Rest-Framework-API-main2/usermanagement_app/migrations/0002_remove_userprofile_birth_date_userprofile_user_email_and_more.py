# Generated by Django 4.2.1 on 2024-01-12 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='birth_date',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user_email',
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='first_name',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]