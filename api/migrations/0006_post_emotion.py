# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-25 22:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20160525_2208'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='emotion',
            field=models.IntegerField(default=0),
        ),
    ]
