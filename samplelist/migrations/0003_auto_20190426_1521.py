# Generated by Django 2.1.7 on 2019-04-26 06:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('samplelist', '0002_auto_20190425_1509'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='target',
            name='syn_date',
        ),
        migrations.AddField(
            model_name='furnacesequence',
            name='syn_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]