# Generated by Django 4.0.4 on 2022-05-21 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_product_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='description',
            field=models.TextField(default='', verbose_name='Описание'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='photo',
            field=models.CharField(blank=True, max_length=512, null=True, verbose_name='Фотография'),
        ),
    ]