# Generated by Django 2.1.7 on 2019-05-14 03:03

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import samplelist.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fab_date', models.DateField(default=django.utils.timezone.now)),
                ('pld', models.IntegerField()),
                ('pld_batch_id', models.IntegerField()),
                ('laser_energy', models.FloatField()),
                ('background_pressure', models.FloatField()),
                ('atmosphere_gas', models.CharField(max_length=10)),
                ('atmosphere_pressure', models.FloatField()),
                ('comment', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='BatchStep',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('temperature', models.FloatField()),
                ('pulse_num', models.IntegerField()),
                ('duration', models.DurationField()),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batch_steps', to='samplelist.Batch')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='EDX',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pub_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('data_file', models.FileField(upload_to=samplelist.models.edx_file_name)),
            ],
        ),
        migrations.CreateModel(
            name='Furnace',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('location', models.CharField(max_length=20)),
                ('comment', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FurnaceSequence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('syn_date', models.DateField(default=django.utils.timezone.now)),
                ('comment', models.TextField(blank=True, null=True)),
                ('furnace', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='samplelist.Furnace')),
            ],
        ),
        migrations.CreateModel(
            name='FurnaceStep',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField()),
                ('start_temperature', models.IntegerField()),
                ('end_temperature', models.IntegerField()),
                ('duration', models.DurationField()),
                ('comment', models.TextField(blank=True, null=True)),
                ('furnace_sequence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='furnace_steps', to='samplelist.FurnaceSequence')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='MPMSDataTimeSeries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.FloatField()),
                ('magnetic_field', models.FloatField()),
                ('temperature', models.FloatField()),
                ('long_moment', models.FloatField()),
                ('sequence', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='MPMSRawFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pub_date', models.DateField(default=django.utils.timezone.now)),
                ('raw_file', models.FileField(upload_to=samplelist.models.mpms_raw_file_name)),
                ('comment', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='OneDimensionXRD',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pub_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('data_file', models.FileField(upload_to=samplelist.models.xrd_file_name)),
            ],
        ),
        migrations.CreateModel(
            name='Sample',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sub_size', models.CharField(max_length=5)),
                ('is_masked', models.BooleanField()),
                ('comment', models.TextField(blank=True, null=True)),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='samples', to='samplelist.Batch')),
            ],
            options={
                'ordering': ['id', 'batch__id', 'substrate'],
            },
        ),
        migrations.CreateModel(
            name='Substrate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chemical_formula', models.CharField(max_length=100)),
                ('abbreviation', models.CharField(max_length=10)),
                ('orientation', models.CharField(max_length=10)),
                ('comment', models.TextField(blank=True, null=True)),
            ],
            options={
                'ordering': ['abbreviation'],
            },
        ),
        migrations.CreateModel(
            name='Target',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chemical_formula', models.CharField(max_length=100)),
                ('abbreviation', models.CharField(max_length=10)),
                ('is_commercial', models.BooleanField(default=False)),
                ('comment', models.TextField(blank=True, null=True)),
                ('furnace_sequence', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='targets', to='samplelist.FurnaceSequence')),
            ],
        ),
        migrations.AddField(
            model_name='sample',
            name='substrate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='samples', to='samplelist.Substrate'),
        ),
        migrations.AddField(
            model_name='onedimensionxrd',
            name='sample',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='samplelist.Sample'),
        ),
        migrations.AddField(
            model_name='mpmsrawfile',
            name='sample',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mpms_raw_files', to='samplelist.Sample'),
        ),
        migrations.AddField(
            model_name='mpmsdatatimeseries',
            name='raw_file',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='samplelist.MPMSRawFile'),
        ),
        migrations.AddField(
            model_name='edx',
            name='sample',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='samplelist.Sample'),
        ),
        migrations.AddField(
            model_name='batchstep',
            name='target',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='samplelist.Target'),
        ),
        migrations.AlterUniqueTogether(
            name='furnacestep',
            unique_together={('furnace_sequence', 'order')},
        ),
        migrations.AlterUniqueTogether(
            name='batchstep',
            unique_together={('batch', 'order')},
        ),
    ]
