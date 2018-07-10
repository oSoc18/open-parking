from django.shortcuts import render
from rest_framework import generics
from .serializers import ParkingDataSerializer
from .models import ParkingData


# views and urls for handling the POST request.
class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = ParkingData.objects.all()
    serializer_class = ParkingDataSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new parkingdata."""
        serializer.save()


class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = ParkingData.objects.all()
    serializer_class = ParkingDataSerializer


class NameView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with currently name.
        """
        parkingname = self.kwargs['name']
        return ParkingData.objects.filter(name=parkingname)
