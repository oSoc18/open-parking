from rest_framework import generics
from rest_framework.response import Response
from .serializers import ParkingDataSerializer, ParkingStaticDataSerializer
from .models import ParkingData
import requests
import json
from json.decoder import JSONDecodeError
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework import status

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
def get_static_url(request, uuid):
    """
    Get the info of the static URL of a parking with a specified UUID
    """
    url = ParkingData.objects.get(
        uuid=uuid).staticDataUrl
    r = requests.get(url)
    dump = json.dumps(r.json())
    return HttpResponse(dump, content_type='application/json')


@api_view(['GET'])
def get_dynamic_url(request, uuid):
    """
    Get the info of the static URL of a parking with a specified UUID
    """
    url = ParkingData.objects.get(
        uuid=uuid).dynamicDataUrl
    if url is None:
        return HttpResponse("Sorry, we could not find a dynamic URL.")
    else:
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


class AreaView(generics.ListAPIView):
    """Gets all the parkingplaces from a specified area."""

    serializer_class = ParkingStaticDataSerializer
    area_level = None

    def get_queryset(self):
        area_name = self.kwargs['area_name']
        return ParkingData.objects.filter(**{self.area_level: area_name})


class NoneView(generics.ListAPIView):
    """
    Get all the parkingplaces without location
    """
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        return ParkingData.objects.filter(Q(region__isnull=True) | Q(region__exact='')
                                          )

def create_summary_view(field_name, lower_field_name):
    return api_view(["GET"])(
        lambda request, area_name: \
        generic_summary_view(field_name, lower_field_name, area_name, request.GET))

def generic_summary_view(field_name, lower_field_name, area_name, get_params):
    usage_mapping = {
        "parkAndRide": "park and ride",
        "garage": "garage",
        "carpool": "carpool",
        "onstreet": "onstreet",
        "terrain": "terrain",
        "otherPlaces": "others"
    }

    fields_mapping = {
        "capacity": ("capacity__isnull", False),
        "tariffs": ("tariffs", True),
        "restrictions": ("minimumHeightInMeters__gt", 0),
        "openingTimes": ("openingTimes", True),
        "contactPersons": ("contactPersons", True),
        "accessPoint": ("accessPoint", True),
        "noDynamic": ("dynamicDataUrl__isnull", True),
        "private": ("limitedAccess", True)
    }

    possible_usages = []
    filter_params = {field_name: area_name, "usage__in": possible_usages}
    exclude_params = {}
    for name, value in get_params.items():
        if name in usage_mapping:
            possible_usages.append(usage_mapping[name])
        else:
            try:
                query_name, query_value = fields_mapping[name]
                if json.loads(value):
                    filter_params[query_name] = query_value
                else:
                    exclude_params[query_name] = query_value
            except (KeyError, JSONDecodeError):
                return Response({"invalid key/value pair in GET parameters":
                    "'{}':'{}'".format(name, value)}, status=status.HTTP_400_BAD_REQUEST)

    parkings = ParkingData.objects.filter(**filter_params).exclude(**exclude_params)
    areas = {}
    for parking in parkings:
        lower_field = getattr(parking, lower_field_name)
        areas.setdefault(
            lower_field, {"good": 0, "average": 0, "bad": 0, "onstreet": 0})
        areas[lower_field][parking.mark] += 1

    dump = json.dumps({
        "name": area_name,
        "children": [{
            "name": area,
            "children": [
                {"name": "good", "value": areas[area]["good"]},
                {"name": "average", "value": areas[area]["average"]},
                {"name": "bad", "value": areas[area]["bad"]}
            ]
            # We do not want to return None locations to the summary frontend
        } for area in areas if area is not None]
    })
    return HttpResponse(dump, content_type='application/json')
