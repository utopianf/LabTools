from django.db import models
from django.utils.timezone import now


# Sample models
class Furnace(models.Model):
    name = models.CharField(max_length=20)
    location = models.CharField(max_length=20)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{0} ({1})'.format(self.name, self.location)


class FurnaceSequence(models.Model):
    syn_date = models.DateField(default=now)
    furnace = models.ForeignKey(Furnace, on_delete=models.CASCADE,
                                blank=True, null=True)
    comment = models.TextField(blank=True, null=True)

    @property
    def sequences_string(self):
        sequences_string = '{0}˚C -> {1}˚C'.format(self.furnace_steps.first().start_temperature,
                                                  self.furnace_steps.first().end_temperature)
        for furnace_step in self.furnace_steps.all()[1:]:
            sequences_string += ' -> {0}˚C'.format(furnace_step.end_temperature)

        return sequences_string


class FurnaceStep(models.Model):
    furnace_sequence = models.ForeignKey(FurnaceSequence,
                                         related_name='furnace_steps',
                                         on_delete=models.CASCADE)

    order = models.IntegerField()
    start_temperature = models.IntegerField()
    end_temperature = models.IntegerField()
    duration = models.DurationField()
    comment = models.TextField(blank=True, null=True)

    @property
    def duration_in_hour(self):
        return self.duration.total_seconds() / 3600.0

    class Meta:
        unique_together = ('furnace_sequence', 'order')
        ordering = ['order']

    def __str__(self):
        return '#{0}: {1}˚C -{2} hr-> {3}˚C'.format(self.order,
                                                    self.start_temperature,
                                                    self.duration_in_hour,
                                                    self.end_temperature)


class Target(models.Model):
    chemical_formula = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)
    is_commercial = models.BooleanField(default=False)
    furnace_sequence = models.ForeignKey(FurnaceSequence,
                                         related_name='targets',
                                         on_delete=models.CASCADE,
                                         blank=True, null=True)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return '#{0}: {1}'.format(self.id,
                                  self.abbreviation)


class Batch(models.Model):
    fab_date = models.DateField(default=now)
    pld = models.IntegerField()
    pld_batch_id = models.IntegerField()
    laser_energy = models.FloatField()
    background_pressure = models.FloatField()
    atmosphere_gas = models.CharField(max_length=10)
    atmosphere_pressure = models.FloatField()
    comment = models.TextField(blank=True, null=True)

    @property
    def targets_string(self):
        return ",".join([bs.target.abbreviation
                         for bs in self.batch_steps.all()])

    def __str__(self):
        return 'Batch #{0}'.format(self.id)


class BatchStep(models.Model):
    batch = models.ForeignKey(Batch,
                              related_name='batch_steps',
                              on_delete=models.CASCADE)

    order = models.IntegerField()
    target = models.ForeignKey(Target, on_delete=models.CASCADE)
    temperature = models.FloatField()
    pulse_num = models.IntegerField()
    duration = models.DurationField()

    class Meta:
        unique_together = ('batch', 'order')
        ordering = ['order']

    @property
    def pulse_frequency(self):
        return float(self.pulse_num) / self.duration.total_seconds()

    def __str__(self):
        return 'Step #{0} in {1}'.format(self.order,
                                         self.batch)


class Substrate(models.Model):
    chemical_formula = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)
    orientation = models.CharField(max_length=10)
    comment = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['abbreviation']

    def __str__(self):
        return '{0}{1}'.format(self.abbreviation,
                               self.orientation)


class Sample(models.Model):
    batch = models.ForeignKey(Batch,
                              related_name='samples',
                              on_delete=models.CASCADE)
    substrate = models.ForeignKey(Substrate,
                                  related_name='samples',
                                  on_delete=models.CASCADE)
    sub_size = models.CharField(max_length=5)
    is_masked = models.BooleanField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['id', 'batch__id', 'substrate']

    @property
    def sample_string(self):
        targets = ",".join([bs.target.abbreviation for bs in self.batch.batch_steps.all()])
        return targets+"@"+self.substrate.abbreviation

    def __str__(self):
        return 'Sample #{0}'.format(self.id)


class SampleDetail(models.Model):
    photo = models.ImageField(upload_to='data/images/', blank=True, null=True)
    color = models.CharField(max_length=6, blank=True, null=True)
    thickness = models.FloatField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    a = models.FloatField(blank=True, null=True)
    b = models.FloatField(blank=True, null=True)
    c = models.FloatField(blank=True, null=True)
    alpha = models.FloatField(blank=True, null=True)
    beta = models.FloatField(blank=True, null=True)
    gamma = models.FloatField(blank=True, null=True)


# Data Models
# MPMS Data
def mpms_raw_file_name(instance, filename):
    return 'data/mpms/raw_files/{0}'.format(filename)


def mh_file_name(instance, filename):
    return 'data/mpms/mh_curves/{0}/{1}'.format(instance.user, filename)


def mt_file_name(instance, filename):
    return 'data/mpms/mt_curves/{0}/{1}'.format(instance.user, filename)


class MPMSRawFile(models.Model):
    pub_date = models.DateField(default=now)
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE,
                               related_name='mpms_raw_files')
    raw_file = models.FileField(upload_to=mpms_raw_file_name)
    comment = models.TextField(blank=True, null=True)


class MPMSDataTimeSeries(models.Model):
    raw_file = models.ForeignKey(MPMSRawFile, on_delete=models.CASCADE)
    time = models.FloatField()
    magnetic_field = models.FloatField()
    temperature = models.FloatField()
    long_moment = models.FloatField()

    sequence = models.IntegerField()


# PPMS Data
# ToDo: PPMS Data


# XRD
def xrd_file_name(instance, filename):
    return 'data/xrd/{0}'.format(filename)


class OneDimensionXRDRawFile(models.Model):
    pub_date = models.DateTimeField(default=now)
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    data_file = models.FileField(upload_to=xrd_file_name)
    comment = models.TextField(blank=True, null=True)


class OneDimensionXRDSeries(models.Model):
    raw_file = models.ForeignKey(OneDimensionXRDRawFile, on_delete=models.CASCADE)
    two_theta = models.FloatField()
    intensity = models.FloatField()


# EDX
def edx_file_name(instance, filename):
    return 'data/edx/{0}/{1}'.format(instance.user, filename)


class EDX(models.Model):
    pub_date = models.DateTimeField(default=now)
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    data_file = models.FileField(upload_to=edx_file_name)
