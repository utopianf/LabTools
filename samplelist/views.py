from rest_framework import viewsets, generics
from rest_framework.decorators import action

from rest_pandas import PandasViewSet

from .serializer import FurnaceSerializer, FurnaceStepSerializer, FurnaceSequenceSerializer, TargetSerializer, \
    SubstrateSerializer, SampleSerializer, BatchStepSerializer, BatchSerializer, MHCurveSerializer, MTCurveSerializer
from .models import Furnace, FurnaceStep, FurnaceSequence, Target, Substrate, Sample, BatchStep, Batch, MHCurve, MTCurve


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
    @action(methods=['post'], detail=True)
    def get_mh_curve(self, request, pk=None):
        sample = self.get_object()
        mh_curve_set = sample.mhcurve_set.all()

    @action(methods=['post'], detail=True)
    def get_mt_curve(self, request, pk=None):
        sample = self.get_object()
        mt_curve_set = sample.mtcurve_set.all()

    @action(methods=['post'], detail=True)
    def get_xrd(self, request, pk=None):
        sample = self.get_object()
        xrd_list = sample.onedimensionxrd_set.all()


class BatchStepViewSet(viewsets.ModelViewSet):
    queryset = BatchStep.objects.order_by('batch__fab_date', 'order')
    serializer_class = BatchStepSerializer


class BatchViewSet(viewsets.ModelViewSet):
    queryset = Batch.objects.order_by('-fab_date')
    serializer_class = BatchSerializer

    @action(methods=['post'], detail=False)
    def from_form(self, request):
        pass


class MHCurveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MHCurve.objects.all()
    serializer_class = MHCurveSerializer


class MTCurveViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MTCurve.objects.all()
    serializer_class = MTCurveSerializer
