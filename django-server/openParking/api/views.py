from rest_framework import generics
from rest_framework.response import Response
from .serializers import ParkingDataSerializer, ParkingStaticDataSerializer
from .models import ParkingData
import requests
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.db.models import Q
from django.template import loader
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


def generic_summary_view(field_name, area_name, lower_field_name):
    parkings = ParkingData.objects.filter(**{field_name: area_name})
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


@api_view(['GET'])
def get_html_page(request, uuid):
    """
    Get the info of the static URL of a parking with a specified UUID
    """

    template = loader.get_template('website/detail.html')

    general_json = ParkingData.objects.get(uuid=uuid)
    name = general_json.name
    identifier = general_json.uuid
    static_url = general_json.staticDataUrl
    dynamic_url = general_json.dynamicDataUrl
    latitude = general_json.latitude
    longitude = general_json.longitude
    country_code = general_json.country_code
    region = general_json.region
    city = general_json.city
    province = general_json.province
    mark = general_json.mark
    usage = general_json.usage

    static_url_json = ParkingData.objects.get(
        uuid=uuid).staticDataUrl
    static_json = requests.get(static_url_json)
    json = static_json.json()

    if "tariffs" in json['parkingFacilityInformation']:
        if len(json['parkingFacilityInformation']['tariffs']) != 0:
            tariffs = "available"
        else:
            tariffs = "not available"
    else:
        tariffs = "not available"

    if "openingTimes" in json['parkingFacilityInformation']:
        if len(json['parkingFacilityInformation']['openingTimes']) != 0:
            opening_times = "available"
        else:
            opening_times = "not available"
    else:
        opening_times = "not available"

    if "contactPersons" in json['parkingFacilityInformation']:
        if len(json['parkingFacilityInformation']['contactPersons']) != 0:
            contact_person = "available"
        else:
            contact_person = "not available"
    else:
        contact_person = "not available"

    if "parkingRestrictions" in json['parkingFacilityInformation']:
        if len(json['parkingFacilityInformation']['parkingRestrictions']) != 0:
            restrictions = "available"
        else:
            restrictions = "not available"
    else:
        restrictions = "not available"

    if "accessPoints" in json['parkingFacilityInformation']:
        if len(json['parkingFacilityInformation']['accessPoints']) != 0:
            accessPoints = "available"
        else:
            accessPoints = "not available"
    else:
        accessPoints = "not available"

    if "capacity" in json['parkingFacilityInformation']['specifications'][0]:
        capacity = json['parkingFacilityInformation']['specifications'][0]['capacity']
    else:
        capacity = "not available"

    if not capacity:
        capacity_alg = "available"
    else:
        capacity_alg = "not available"

    operator = json['parkingFacilityInformation']['operator']['name']

    if latitude != None:
        latitude1 = latitude - 0.01
        latitude2 = latitude + 0.01
        longitude1 = longitude - 0.01
        longitude2 = longitude + 0.01
    else:
        latitude1 = 0
        latitude2 = 0
        longitude1 = 0
        longitude2 = 0

    context = {
        'name': name,
        'identifier': identifier,
        'static_url': static_url,
        'dynamic_url': dynamic_url,
        'latitude': latitude,
        'longitude': longitude,
        'country_code': country_code,
        'region': region,
        'city': city,
        'province': province,
        'mark': mark,
        'usage': usage,
        'tariffs': tariffs,
        "opening_times": opening_times,
        "contact_person": contact_person,
        "restrictions": restrictions,
        "accessPoints": accessPoints,
        'operator': operator,
        'capacity_alg': capacity_alg,
        'capacity': capacity,
        'latitude1': latitude1,
        'latitude2': latitude2,
        'longitude1': longitude1,
        'longitude2': longitude2,
    }
    return HttpResponse(template.render(context, request))
