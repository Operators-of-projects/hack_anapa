# Generated by Django 4.0.4 on 2022-05-21 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_vendor_is_product_vendor_is_services'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='phone',
            field=models.CharField(default=88005553535, max_length=15, verbose_name='Телефон'),
            preserve_default=False,
        ),
    ]