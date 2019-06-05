from django.urls import path
from .views import index, furnace, substrate, target, sample

urlpatterns = [
    path('', index, name='sample-list'),
    path('furnace/', furnace, name='furnace-list'),
    path('substrate/', substrate, name='substrate-list'),
    path('target/', target, name='target-list'),
    path('sample/<int:sample_id>', sample, name='sample-detail')
]
