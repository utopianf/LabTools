from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response

from django_pandas.io import read_frame

from .serializer import FurnaceSerializer, FurnaceStepSerializer, FurnaceSequenceSerializer, TargetSerializer, \
    SubstrateSerializer, SampleSerializer, BatchStepSerializer, BatchSerializer, MPMSDataTimeSeriesSerializer, \
    MPMSRawFileSerializer
from .models import Furnace, FurnaceStep, FurnaceSequence, Target, Substrate, Sample, BatchStep, Batch, \
    MPMSRawFile, MPMSDataTimeSeries

import numpy as np


# Create your views here.
class FurnaceViewSet(viewsets.ModelViewSet):
    queryset = Furnace.objects.all()
    serializer_class = FurnaceSerializer


class FurnaceStepViewSet(viewsets.ModelViewSet):
    queryset = FurnaceStep.objects.order_by('order')
    serializer_class = FurnaceStepSerializer


class FurnaceSequenceViewSet(viewsets.ModelViewSet):
    queryset = FurnaceSequence.objects.all()
    serializer_class = FurnaceSequenceSerializer


class TargetViewSet(viewsets.ModelViewSet):
    queryset = Target.objects.order_by('abbreviation')
    serializer_class = TargetSerializer


class SubstrateViewSet(viewsets.ModelViewSet):
    queryset = Substrate.objects.order_by('abbreviation')
    serializer_class = SubstrateSerializer


class SampleViewSet(viewsets.ModelViewSet):
    queryset = Sample.objects.order_by('-id')
    serializer_class = SampleSerializer

    # TODO: get mh mt curve
    @action(methods=['get'], detail=True)
    def get_mpms_curve(self, request, pk=None):
        mpms_curve_set = MPMSDataTimeSeries.objects.filter(raw_file__sample=pk)
        serializer = MPMSDataTimeSeriesSerializer(mpms_curve_set, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def get_xrd(self, request, pk=None):
        sample = self.get_object()
        xrd_list = sample.onedimensionxrd_set.all()

        return Response({'status': 'Not implemented'})


class BatchStepViewSet(viewsets.ModelViewSet):
    queryset = BatchStep.objects.order_by('batch__fab_date', 'order')
    serializer_class = BatchStepSerializer


class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.order_by('-fab_date')
    serializer_class = BatchSerializer


class MPMSRawFileViewSet(viewsets.ModelViewSet):
    queryset = MPMSRawFile.objects.all()
    serializer_class = MPMSRawFileSerializer


class MPMSDataViewSet(viewsets.ModelViewSet):
    queryset = MPMSDataTimeSeries.objects.all()
    serializer_class = MPMSDataTimeSeriesSerializer
    filterset_fields = ('raw_file', 'sequence')
