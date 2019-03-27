from django.db import models


# Create your models here.
def mpms_file_name(instance, filename):
    return 'data/mpms/{0}/{1}'.format(instance.user, filename)


class DataFile(models.Model):
    user = models.CharField(max_length=100)
    sample = models.CharField(max_length=100)
    pub_date = models.DateField()
    comment = models.TextField()
    raw_data = models.FileField(upload_to=mpms_file_name)


class Curve(models.Model):
    comment = models.TextField(blank=True, null=True)
    temperature = models.FloatField(blank=True, null=True)
    magnetic_field = models.FloatField(blank=True, null=True)
    sequence = models.CharField(max_length=2)
    data_file = models.ForeignKey(DataFile, on_delete=models.CASCADE)

    def __str__(self):
        if self.sequence == 'MH':
            return '{0}: {1}-{2:.1f}'.format(
                self.sample,
                self.sequence,
                self.temperature,
            )
        elif self.sequence == 'MT':
            return '{0}: {1}-{2:.0f}'.format(
                self.sample,
                self.sequence,
                self.magnetic_field,
            )


class Point(models.Model):
    magnetization = models.FloatField()
    temperature = models.FloatField()
    magnetic_field = models.FloatField()
    curve = models.ForeignKey(Curve, on_delete=models.CASCADE)
