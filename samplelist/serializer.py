from rest_framework import serializers
from rest_framework.reverse import reverse_lazy

from .models import Batch, BatchStep, Sample, Furnace, \
    FurnaceSequence, FurnaceStep, Substrate, Target, \
    MPMSRawFile, MPMSDataTimeSeries

import pandas as pd


# Synthesis Serializer
class FurnaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furnace
        fields = '__all__'


class FurnaceStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnaceStep
        fields = ('order', 'start_temperature', 'end_temperature', 'duration')


class TargetSerializer(serializers.ModelSerializer):
    sequences_string = serializers.CharField(source='furnace_sequence.sequences_string', read_only=True)
    is_commercial = serializers.CharField()

    class Meta:
        model = Target
        fields = ('id', 'chemical_formula', 'abbreviation', 'is_commercial', 'sequences_string', 'comment')


class FurnaceSequenceSerializer(serializers.ModelSerializer):
    furnace_steps = FurnaceStepSerializer(many=True)
    targets = TargetSerializer(many=True)

    class Meta:
        model = FurnaceSequence
        fields = ('syn_date', 'targets', 'furnace', 'furnace_steps', 'comment')

    def create(self, validated_data):
        targets_data = validated_data.pop('targets')
        furnace_steps_data = validated_data.pop('furnace_steps')
        furnace_sequence = FurnaceSequence.objects.create(**validated_data)
        for target_data in targets_data:
            Target.objects.create(furnace_sequence=furnace_sequence, **target_data)
        for furnace_step_data in furnace_steps_data:
            FurnaceStep.objects.create(furnace_sequence=furnace_sequence, **furnace_step_data)
        return furnace_sequence


class SubstrateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Substrate
        fields = '__all__'


class SampleSerializer(serializers.ModelSerializer):
    batch_id = serializers.IntegerField(source='batch.id', read_only=True)
    pld = serializers.IntegerField(source='batch.pld')
    pld_batch_id = serializers.IntegerField(source='batch.pld_batch_id')
    fab_date = serializers.DateField(source='batch.fab_date', format="%y%m%d")
    targets_string = serializers.CharField(source='batch.targets_string')
    atmosphere_gas = serializers.CharField(source='batch.atmosphere_gas')
    atmosphere_pressure = serializers.FloatField(source='batch.atmosphere_pressure')
    background_pressure = serializers.FloatField(source='batch.background_pressure')
    laser_energy = serializers.FloatField(source='batch.laser_energy')
    substrate_abbreviation = serializers.CharField(source='substrate.abbreviation')

    is_masked = serializers.CharField()

    class Meta:
        model = Sample
        fields = ('id', 'batch_id', 'pld', 'pld_batch_id', 'fab_date', 'targets_string',
                  'substrate_abbreviation', 'sub_size', 'is_masked', 'atmosphere_gas',
                  'atmosphere_pressure', 'background_pressure', 'laser_energy',
                  'comment')


class SampleInBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ('substrate', 'sub_size', 'is_masked')


class BatchStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchStep
        fields = ('order', 'target', 'temperature', 'pulse_num', 'duration')


class BatchSerializer(serializers.ModelSerializer):
    samples = SampleInBatchSerializer(many=True)
    batch_steps = BatchStepSerializer(many=True)

    class Meta:
        model = Batch
        fields = ('fab_date', 'pld', 'pld_batch_id', 'laser_energy', 'background_pressure',
                  'atmosphere_gas', 'atmosphere_pressure', 'comment', 'samples', 'batch_steps')

    def create(self, validated_data):
        samples_data = validated_data.pop('samples')
        batch_steps_data = validated_data.pop('batch_steps')
        batch = Batch.objects.create(**validated_data)
        for sample_data in samples_data:
            Sample.objects.create(batch=batch, **sample_data)
        for batch_step_data in batch_steps_data:
            BatchStep.objects.create(batch=batch, **batch_step_data)
        return batch


class MPMSDataTimeSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPMSDataTimeSeries
        fields = '__all__'


class MPMSRawFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPMSRawFile
        fields = '__all__'

    def create(self, validated_data):
        mpms_raw_file = MPMSRawFile.objects.create(**validated_data)

        dataframe = pd.read_csv(mpms_raw_file.raw_file, header=20)
        df_iter = dataframe.iterrows()
        _, prow = next(df_iter)
        seq, pre = 0, None
        MPMSDataTimeSeries(raw_file=mpms_raw_file,
                           time=prow['Time'],
                           magnetic_field=prow['Field (Oe)'],
                           temperature=prow['Temperature (K)'],
                           long_moment=prow['Long Moment (emu)'],
                           sequence=seq).save()
        _, row = next(df_iter)
        MPMSDataTimeSeries(raw_file=mpms_raw_file,
                           time=prow['Time'],
                           magnetic_field=prow['Field (Oe)'],
                           temperature=prow['Temperature (K)'],
                           long_moment=prow['Long Moment (emu)'],
                           sequence=seq).save()

        sequence = None
        if abs(prow['Temperature (K)'] - row['Temperature (K)']) < 5.0:
            sequence = "MH"
        elif abs(prow['Field (Oe)'] - row['Field (Oe)']) < 1.0:
            sequence = "MT"

        prow = row
        while True:
            try:
                _, row = next(df_iter)
                if sequence == "MH" and abs(prow['Temperature (K)'] - row['Temperature (K)']) >= 5.0:
                    seq += 1
                    MPMSDataTimeSeries(raw_file=mpms_raw_file,
                                       time=row['Time'],
                                       magnetic_field=row['Field (Oe)'],
                                       temperature=row['Temperature (K)'],
                                       long_moment=row['Long Moment (emu)'],
                                       sequence=seq).save()

                    prow = row
                    _, row = next(df_iter)
                    if abs(prow['Temperature (K)'] - row['Temperature (K)']) < 5.0:
                        sequence = "MH"
                    elif abs(prow['Field (Oe)'] - row['Field (Oe)']) < 1.0:
                        sequence = "MT"
                    MPMSDataTimeSeries(raw_file=mpms_raw_file,
                                       time=row['Time'],
                                       magnetic_field=row['Field (Oe)'],
                                       temperature=row['Temperature (K)'],
                                       long_moment=row['Long Moment (emu)'],
                                       sequence=seq).save()

                elif sequence == "MT" and abs(prow['Field (Oe)'] - row['Field (Oe)']) >= 1.0:
                    seq += 1
                    MPMSDataTimeSeries(raw_file=mpms_raw_file,
                                       time=row['Time'],
                                       magnetic_field=row['Field (Oe)'],
                                       temperature=row['Temperature (K)'],
                                       long_moment=row['Long Moment (emu)'],
                                       sequence=seq).save()

                    prow = row
                    _, row = next(df_iter)
                    if abs(prow['Temperature (K)'] - row['Temperature (K)']) < 5.0:
                        sequence = "MH"
                    elif abs(prow['Field (Oe)'] - row['Field (Oe)']) < 1.0:
                        sequence = "MT"
                    MPMSDataTimeSeries(raw_file=mpms_raw_file,
                                       time=row['Time'],
                                       magnetic_field=row['Field (Oe)'],
                                       temperature=row['Temperature (K)'],
                                       long_moment=row['Long Moment (emu)'],
                                       sequence=seq).save()
                else:
                    MPMSDataTimeSeries(raw_file=mpms_raw_file,
                                       time=row['Time'],
                                       magnetic_field=row['Field (Oe)'],
                                       temperature=row['Temperature (K)'],
                                       long_moment=row['Long Moment (emu)'],
                                       sequence=seq).save()
                prow = row

            except StopIteration:
                break
        return mpms_raw_file


class SampleDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sample
