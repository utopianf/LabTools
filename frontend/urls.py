from django.urls import path
from .views import index, furnace

urlpatterns = [
    path('', index),
    path('furnace/', furnace)
]