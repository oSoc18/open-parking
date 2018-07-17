from rest_framework import generics
from rest_framework.response import Response
from .serializers import ParkingDataSerializer
from .models import ParkingData
import requests
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view

import pprint

class DetailsView(generics.RetrieveAPIView):
    """
    Get a detailed view of a parking by its ID
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        parking_id = self.kwargs['pk']
        return ParkingData.objects.filter(id=parking_id)


class UuidView(generics.ListAPIView):
    """
    Get a detailed view of a parking by its UUID
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        parking_uuid = self.kwargs['uuid']
        return ParkingData.objects.filter(uuid=parking_uuid)


@api_view(['GET'])
def getStaticUrl(request, uuid):
    """
    Get the info of the static URL of a parking with a specified UUID
    """
    url = ParkingData.objects.get(
        uuid=uuid).staticDataUrl
    r = requests.get(url)
    dump = json.dumps(r.json())
    return HttpResponse(dump, content_type='application/json')


class RectangleView(generics.ListAPIView):
    """
    Get all instances located in a rectangle defined by two points.
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        southwest_lng = float(self.kwargs['southwest_lng'])
        southwest_lat = float(self.kwargs['southwest_lat'])
        northeast_lng = float(self.kwargs['northeast_lng'])
        northeast_lat = float(self.kwargs['northeast_lat'])

        return ParkingData.objects.filter(longitude__gte=southwest_lng,
                latitude__gte=southwest_lat, longitude__lte=northeast_lng,
                latitude__lte=northeast_lat)


class StaticView(generics.ListAPIView):
    """
    Get all the parkingplaces without dynamic data
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        """
        This view should return a list of all the parkingdata
        with no dynamic data link .
        """
        return ParkingData.objects.filter(dynamicDataUrl__isnull=True)


class DynamicView(generics.ListAPIView):
    """
    Get all the parkingplaces with dynamic data
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        return ParkingData.objects.filter(dynamicDataUrl__isnull=False)


class CountryView(generics.ListAPIView):
    """
    Get all the parkingplaces from a specified country
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        country_code = self.kwargs['country_code']
        return ParkingData.objects.filter(country_code=country_code)


class RegionView(generics.ListAPIView):
    """
    Get all the parkingplaces from a specified region
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        region_Name = self.kwargs['region_name']
        return ParkingData.objects.filter(region=region_Name)


class ProvinceView(generics.ListAPIView):
    """
    Get all the parkingplaces from a specified province
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        province_Name = self.kwargs['province_name']
        return ParkingData.objects.filter(province=province_Name)


class CityView(generics.ListAPIView):
    """
    Get all the parkingplaces from a specified city
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        city_Name = self.kwargs['city_name']
        return ParkingData.objects.filter(city=city_Name)


class NoneView(generics.ListAPIView):
    """
    Get all the parkingplaces without location
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        return ParkingData.objects.filter(region__isnull=True)


class OffstreetView(generics.ListAPIView):
    """
    Get all the offstreet parkings
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):

        return ParkingData.objects.filter(facilityType="offstreet")


@api_view(['GET'])
def getMultipleStaticUrl(request, from_id, to_id):
    """
    Get the json of all parkingplaces (from_id to to_id)
    """
    static_jsons = []
    for id in range(int(from_id), int(to_id)):
        url = ParkingData.objects.get(
            id=id).staticDataUrl
        r = requests.get(url).json()
        static_jsons.append(r)
    return HttpResponse(json.dumps(static_jsons), content_type='application/json')

def generic_summary_view(field_name, area_name, lower_field_name):
    parkings = ParkingData.objects.filter(**{field_name: area_name})
    areas = {}
    for parking in parkings:
        lower_field = getattr(parking, lower_field_name)
        areas.setdefault(lower_field, {"good": 0, "average": 0, "bad": 0})
        mark = get_mark(parking)
        areas[lower_field][mark] += 1

    dump = json.dumps({
        "name": area_name,
        "children": [{
            "name": area,
            "children": [
                {"name": "good", "value": areas[area]["good"]},
                {"name": "average", "value": areas[area]["average"]},
                {"name": "bad", "value": areas[area]["bad"]}
            ]
        } for area in areas]
    })
    return HttpResponse(dump, content_type='application/json')
