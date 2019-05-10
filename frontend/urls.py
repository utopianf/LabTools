from django.urls import path
from .views import index, furnace, substrate, target

urlpatterns = [
    path('', index),
    path('furnace/', furnace),
    path('substrate/', substrate),
    path('target/', target)
]
