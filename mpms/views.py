from rest_framework import viewsets
from rest_framework.response import Response

from .models import Curve, DataFile
from .serializer import CurveSerializer, DataFileSerializer


# Create your views here.
class CurveViewSet(viewsets.ModelViewSet):
    queryset = Curve.objects.all().order_by('-id')
    serializer_class = CurveSerializer

    def retrieve(self, request, *args, **kwargs):
        curve = self.get_object()
        if curve.sequence == "MH":
            points = [{"M": p.magnetization, "H": p.magnetic_field} for p in curve.point_set.all()]
        elif curve.sequence == "MT":
            points = [{"M": p.magnetization, "H": p.temperature} for p in curve.point_set.all()]
        data = self.get_serializer(curve).data
        data['points'] = points
        return Response(data)


class DataFileViewSet(viewsets.ModelViewSet):
    queryset = DataFile.objects.all()
    serializer_class = DataFileSerializer
