import pandas as pd

from rest_framework import serializers

from .models import DataFile, Curve, Point


class CurveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curve
        fields = '__all__'


class DataFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFile
        fields = ('id', 'user', 'sample', 'pub_date', 'comment', 'raw_data')

    def create(self, validated_data):
        data_file = DataFile(
            user=validated_data['user'],
            sample=validated_data['sample'],
            pub_date=validated_data['pub_date'],
            comment=validated_data['comment'],
            raw_data=validated_data['raw_data'],
        )
        data_file.save()

        mpms_df = pd.read_csv(data_file.raw_data, header=20)
        ph, pt, pm = mpms_df.iat[0, 2], mpms_df.iat[0, 3], mpms_df.iat[0, 4]
        if abs(mpms_df.iat[0, 2] - mpms_df.iat[1, 2]) < 5.0:
            sequence = 'MT'
            curve = Curve(
                magnetic_field=round(ph, 0),
                sequence=sequence,
                data_file=data_file,
            )
        else:
            sequence = 'MH'
            curve = Curve(
                temperature=round(pt, 0),
                sequence=sequence,
                data_file=data_file,
            )
        curve.save()

        for i in range(mpms_df.shape[0]):
            h, t, m = mpms_df.iat[i, 2], mpms_df.iat[i, 3], mpms_df.iat[i, 4]

            if (sequence == 'MH' and abs(pt-t) > 5.0) or (sequence == 'MT' and abs(ph-h) > 5.0):
                if abs(h-mpms_df.iat[i+1, 2]) < 5.0:
                    sequence = 'MT'
                    curve = Curve(
                        magnetic_field=round(ph, 0),
                        sequence=sequence,
                        data_file=data_file,
                    )
                else:
                    sequence = 'MH'
                    curve = Curve(
                        temperature=round(pt, 0),
                        sequence=sequence,
                        data_file=data_file,
                    )
                curve.save()

            Point(
                magnetic_field=h,
                temperature=t,
                magnetization=m,
                curve=curve,
            ).save()

            ph, pt, pm = h, t, m

        return data_file

