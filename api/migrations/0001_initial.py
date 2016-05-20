# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-20 09:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='title', max_length=100)),
                ('post_type', models.CharField(default='type', max_length=100)),
                ('by', models.CharField(default='by', max_length=100)),
                ('site_host', models.CharField(default='host', max_length=100)),
                ('score', models.IntegerField(default=0)),
                ('url', models.CharField(default='url', max_length=200)),
                ('text', models.TextField(default=0)),
                ('published_date', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('score',),
            },
        ),
    ]
