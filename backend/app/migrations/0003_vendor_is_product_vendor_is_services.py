# Generated by Django 4.0.4 on 2022-05-21 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_transaction_cost_alter_product_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='is_product',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vendor',
            name='is_services',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]