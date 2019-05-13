from django.urls import path

from rest_framework import routers
from .views import FurnaceViewSet, FurnaceStepViewSet, FurnaceSequenceViewSet, TargetViewSet, \
    SubstrateViewSet, SampleViewSet, BatchStepViewSet, BatchViewSet, MPMSRawFileViewSet, MPMSDataViewSet

router = routers.DefaultRouter()
router.register(r'furnace', FurnaceViewSet)
router.register(r'furnace_step', FurnaceStepViewSet)
router.register(r'furnace_sequence', FurnaceSequenceViewSet)
router.register(r'target', TargetViewSet)
router.register(r'substrate', SubstrateViewSet)
router.register(r'sample', SampleViewSet)
router.register(r'batch_step', BatchStepViewSet)
router.register(r'batch', BatchViewSet)
router.register(r'mpms_rawfile', MPMSRawFileViewSet)
router.register(r'mpms_data', MPMSDataViewSet)

urlpatterns = []
