from django.http import HttpResponse
from django.template import loader
from django.views.generic.list import ListView

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Curve, DataFile
from .serializer import CurveSerializer, DataFileSerializer


# Create your views here.
class CurveViewSet(viewsets.ModelViewSet):
    queryset = Curve.objects.all().order_by('-id')
    serializer_class = CurveSerializer

    @action(detail=True)
    def get_data_points(self, request, pk=None):
        curve = self.get_object()
        points = []
        if curve.sequence == "MH":
            points = [{"x": p.magnetic_field, "y": p.magnetization} for p in curve.point_set.all()]
        elif curve.sequence == "MT":
            points = [{"x": p.temperature, "y": p.magnetization} for p in curve.point_set.all()]
        data = {'dataPoints': points}
        return Response(data)


class DataFileViewSet(viewsets.ModelViewSet):
    queryset = DataFile.objects.all()
    serializer_class = DataFileSerializer


class IndexView(ListView):

    model = Curve
    template_name = "mpms/index.html"
    paginate_by = 10
