from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')


def furnace(request):
    return render(request, 'frontend/furnace.html')


def substrate(request):
    return render(request, 'frontend/substrate.html')


def target(request):
    return render(request, 'frontend/target.html')
