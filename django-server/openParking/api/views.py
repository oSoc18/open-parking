from rest_framework import generics
from .serializers import ParkingDataSerializer
from .models import ParkingData
import requests
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view


class DetailsView(generics.RetrieveAPIView):
    """Get one instance from its ID."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        parking_id = self.kwargs['pk']
        return ParkingData.objects.filter(id=parking_id)


class UuidView(generics.ListAPIView):
    """ Get an instance by its UUID."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        parking_uuid = self.kwargs['uuid']
        return ParkingData.objects.filter(uuid=parking_uuid)


@api_view(['GET'])
def getStaticUrl(request, uuid):
    url = ParkingData.objects.get(
        uuid=uuid).staticDataUrl
    r = requests.get(url)
    dump = json.dumps(r.json())
    return HttpResponse(dump, content_type='application/json')


class RectangleView(generics.ListAPIView):
    """Get all instances located in a rectangle defined by two points."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        southwest_lng = float(self.kwargs['southwest_lng'])
        southwest_lat = float(self.kwargs['southwest_lat'])
        northeast_lng = float(self.kwargs['northeast_lng'])
        northeast_lat = float(self.kwargs['northeast_lat'])

        return ParkingData.objects.filter(longitude__gte=southwest_lng, latitude__gte=southwest_lat, longitude__lte=northeast_lng, latitude__lte=northeast_lat)


class StaticView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with no dynamic data link .
        """
        return ParkingData.objects.filter(dynamicDataUrl__isnull=True)

class DynamicView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with a dynamic data link.
        """
        return ParkingData.objects.filter(dynamicDataUrl__isnull=False)


class CountryView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):

        return


class ProvinceView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):

        return


class CityView(generics.ListAPIView):
    serializer_class = ParkingDataSerializer

    def get_queryset(self):

        return
