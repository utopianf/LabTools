from django.conf.urls import url

from rest_framework import routers
from .views import DataFileViewSet, CurveViewSet

router = routers.DefaultRouter()
router.register(r'curve', CurveViewSet)
router.register(r'data', DataFileViewSet)