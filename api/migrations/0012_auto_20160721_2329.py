# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-21 22:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20160530_1235'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='url',
            field=models.URLField(default='url'),
        ),
    ]