from rest_framework import viewsets
from rest_framework.decorators import action

from .serializer import FurnaceSerializer, FurnaceStepSerializer, FurnaceSequenceSerializer, TargetSerializer, \
    SubstrateSerializer, SampleSerializer, BatchStepSerializer, BatchSerializer
from .models import Furnace, FurnaceStep, FurnaceSequence, Target, Substrate, Sample, BatchStep, Batch


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


class BatchStepViewSet(viewsets.ModelViewSet):
    queryset = BatchStep.objects.order_by('batch__fab_date', 'order')
    serializer_class = BatchStepSerializer


class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.order_by('-fab_date')
    serializer_class = BatchSerializer

    @action(methods=['post'], detail=False)
    def from_form(self, request):
        pass
