# Generated by Django 3.2 on 2021-04-17 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tast',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titile', models.CharField(max_length=255)),
                ('completed', models.BooleanField(blank=True, default=False, null=True)),
            ],
        ),
    ]
