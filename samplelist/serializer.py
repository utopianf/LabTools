from rest_framework import serializers

from .models import Batch, BatchStep, Sample, Furnace, \
    FurnaceSequence, FurnaceStep, Substrate, Target


# Synthesis Serializer
class FurnaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furnace
        fields = '__all__'


class FurnaceStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnaceStep
        fields = '__all__'


class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = '__all__'


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
    class Meta:
        model = Sample
        fields = ('id', 'batch', 'substrate', 'sub_size', 'is_masked', 'comment')

    def to_representation(self, instance):
        targets_string = ','.join([bs.target.abbreviation
                                   for bs in instance.batch.batch_steps.all()])
        return {
            '#': instance.id,
            'Fabrication Date': instance.batch.fab_date.strftime("%Y-%m-%d"),
            'PLD': instance.batch.pld,
            'Target': targets_string,
            'Laser Energy (mJ)': instance.batch.laser_energy,
            'Background Pressure (Torr)': instance.batch.background_pressure,
            'Atmosphere Gas': instance.batch.atmosphere_gas,
            'Atmosphere Pressure (Torr)': instance.batch.atmosphere_pressure,
            'Substrate': '{0}({1})'.format(instance.substrate.abbreviation,
                                           instance.substrate.orientation),
            'Substrate Size (mm)': instance.sub_size,
            'Mask?': str(instance.is_masked),
            'Comment': instance.comment,
        }


class BatchStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchStep
        fields = '__all__'


class BatchSerializer(serializers.ModelSerializer):
    samples = SampleSerializer(many=True)
    batch_steps = BatchStepSerializer(many=True)

    class Meta:
        model = Batch
        fields = '__all__'

    def create(self, validated_data):
        samples_data = validated_data.pop('samples')
        batch_steps_data = validated_data.pop('batch_steps')
        batch = Batch.objects.create(**validated_data)
        for sample_data in samples_data:
            Sample.objects.create(batch=batch, **sample_data)
        for batch_step_data in batch_steps_data:
            BatchStep.objects.create(batch=batch, **batch_step_data)
        return batch
