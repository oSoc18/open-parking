from django.shortcuts import render
from rest_framework import generics
from .serializers import ParkingDataSerializer
from .models import ParkingData
import requests
from django.http import JsonResponse
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
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
        with current name.
        """
        parkingname = self.kwargs['name']
        return ParkingData.objects.filter(name=parkingname)


class NoNameView(generics.ListAPIView):
    """wrote this class to test dhe exclude() method"""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with current name.
        """
        parkingname = self.kwargs['name']
        return ParkingData.objects.exclude(name=parkingname)


class IDsView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        queryset = ParkingData.objects.all()
        """
        This view should return a list of all the parkingdata
        with current name.
        """
        for x in range(int(self.kwargs['id1']), int(self.kwargs['id2'])):
            queryset = queryset.exclude(id=x)
        return queryset


class UuidView(generics.ListAPIView):
    """wrote this class to test dhe exclude() method"""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with current name.
        """
        parking_uuid = self.kwargs['uuid']
        return ParkingData.objects.filter(uuid=parking_uuid)


def staticUrl(request, id):
    url = ParkingData.objects.get(
        id=id).staticDataUrl
    r = requests.get(url)
    dump = json.dumps(r.json())
    return HttpResponse(dump, content_type='application/json')


class RectangleView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with current name.
        """
        southwest_lng = float(self.kwargs['southwest_lng'])
        southwest_lat = float(self.kwargs['southwest_lat'])
        northeast_lng = float(self.kwargs['northeast_lng'])
        northeast_lat = float(self.kwargs['northeast_lat'])
        print("sw: ", southwest_lng, type(southwest_lng))
        print("sw: ", southwest_lat, type(southwest_lat))
        print("ne long: ", northeast_lng, type(northeast_lng))
        print("ne lat: ", northeast_lat, type(northeast_lat))

        return ParkingData.objects.filter(longitude__gte=southwest_lng, latitude__gte=southwest_lat, longitude__lte=northeast_lng, latitude__lte=northeast_lat)
