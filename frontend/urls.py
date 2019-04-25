from django.urls import path
from .views import index, furnace, substrate

urlpatterns = [
    path('', index),
    path('furnace/', furnace),
    path('substrate/', substrate)
]
