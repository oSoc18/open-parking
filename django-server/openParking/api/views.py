"""Contains classes and functions for the different views. One view matches
with one or several API calls.
"""

from rest_framework import generics
from rest_framework.response import Response
from .serializers import ParkingDataSerializer
from .models import ParkingData
import requests
import json
from json.decoder import JSONDecodeError
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework import status
from django.template import loader


def get_filtered_facilities(get_params):
    """Returns a set of facilities filtered from GET parameters."""
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
        "dynamic": ("dynamicDataUrl__isnull", False),
        "private": ("limitedAccess", True)
    }

    possible_usages = []
    filter_params = {"usage__in": possible_usages}
    exclude_queryset = Q()
    for name, value in get_params.items():
        if name in usage_mapping and json.loads(value):
            possible_usages.append(usage_mapping[name])
        elif name in fields_mapping:
            query_name, query_value = fields_mapping[name]
            if json.loads(value):
                filter_params[query_name] = query_value
            else:
                exclude_queryset |= Q(**{query_name: query_value})
    return  ParkingData.objects.filter(**filter_params).exclude(exclude_queryset)

class IdView(generics.RetrieveAPIView):
    """Gets the data of a parking by its database ID."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        parking_id = self.kwargs['pk']
        return ParkingData.objects.filter(id=parking_id)


class UuidView(generics.ListAPIView):
    """Gets the data of a parking by its UUID."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        parking_uuid = self.kwargs['uuid']
        return ParkingData.objects.filter(uuid=parking_uuid)

@api_view(['GET'])
def get_dynamic_data(request, uuid):
    """Gets the dynamic data of a parking selected by its UUID."""
    url = ParkingData.objects.get(uuid=uuid).dynamicDataUrl
    if url is None:
        return HttpResponse("Sorry, we could not find a dynamic URL.")
    else:
        r = requests.get(url)
        dump = json.dumps(r.json())
        return HttpResponse(dump, content_type='application/json')


class RectangleView(generics.ListAPIView):
    """Get all facilities located in a rectangle defined by two points."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        southwest_lng = float(self.kwargs['southwest_lng'])
        southwest_lat = float(self.kwargs['southwest_lat'])
        northeast_lng = float(self.kwargs['northeast_lng'])
        northeast_lat = float(self.kwargs['northeast_lat'])

        return ParkingData.objects.filter(longitude__gte=southwest_lng,
                                          latitude__gte=southwest_lat,
                                          longitude__lte=northeast_lng,
                                          latitude__lte=northeast_lat)


class AreaView(generics.ListAPIView):
    """Gets all the parkingplaces from a specified area."""

    serializer_class = ParkingDataSerializer
    area_level = None

    def get_queryset(self):
        area_name = self.kwargs['area_name']
        try:
            return get_filtered_facilities(self.request.GET).filter(**{self.area_level: area_name})
        except JSONDecodeError as e:
            return Response({"invalid value in GET parameters": str(e)},
                             status=status.HTTP_400_BAD_REQUEST)


class NoneView(generics.ListAPIView):
    """Gets all the parkingplaces without region."""
    serializer_class = ParkingDataSerializer

    def get_queryset(self):
        try:
            return get_filtered_facilities(self.request.GET).filter(Q(region__isnull=True) | Q(region=""))
        except JSONDecodeError as e:
            return Response({"invalid value in GET parameters": str(e)},
                             status=status.HTTP_400_BAD_REQUEST)


def create_summary_view(field_name, lower_field_name):
    return api_view(["GET"])(
        lambda request, area_name:
        generic_summary_view(field_name, lower_field_name, area_name, request.GET))


def generic_summary_view(field_name, lower_field_name, area_name, get_params):
    try:
        parkings = get_filtered_facilities(get_params).filter(**{field_name: area_name})
    except JSONDecodeError as e:
        return Response({"invalid value in GET parameters": str(e)},
                         status=status.HTTP_400_BAD_REQUEST)

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
