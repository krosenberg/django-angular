# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-06 01:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20170406_0100'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='createdAt',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
