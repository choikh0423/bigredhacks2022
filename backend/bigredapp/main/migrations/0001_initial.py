# Generated by Django 4.1.2 on 2022-10-15 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Apartment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('rating', models.FloatField(default=5.0)),
                ('number_of_reviews', models.IntegerField(default=0)),
                ('gym', models.BooleanField(default=False)),
                ('laundry', models.CharField(choices=[('No Laundry', 'No Laundry'), ('In-unit Laundry', 'In-unit Laundry'), ('Shared Laundry', 'Shared Laundry')], default='No Laundry', max_length=20)),
                ('complimentary_wifi_router', models.BooleanField(default=False)),
                ('electricity', models.BooleanField(default=False)),
            ],
        ),
    ]
