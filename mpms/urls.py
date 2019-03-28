from django.conf.urls import url
from django.urls import path

from rest_framework import routers
from .views import DataFileViewSet, CurveViewSet, IndexView

router = routers.DefaultRouter()
router.register(r'curve', CurveViewSet)
router.register(r'data', DataFileViewSet)

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]