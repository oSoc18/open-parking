from django.shortcuts import render
from rest_framework import generics
from .serializers import ParkingDataSerializer
from .models import ParkingData
from rest_framework import viewsets
# Create your views here.


# views and urls for handling the POST request.
class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = ParkingData.objects.all()
    serializer_class = ParkingDataSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()


class DataViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ParkingData.objects.all()
    serializer_class = ParkingDataSerializer
