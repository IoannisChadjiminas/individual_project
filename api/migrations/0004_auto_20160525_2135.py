# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-25 20:35
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_voter'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ('-score',)},
        ),
    ]
