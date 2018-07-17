from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import DetailsView, UuidView, RectangleView, StaticView, DynamicView, \
    CountryView, RegionView, ProvinceView, CityView, OffstreetView, \
    generic_summary_view, get_static_url, get_multiple_static_url, NoneView
from rest_framework.decorators import api_view


urlpatterns = {
    # get parkingplace with a certain id: http://127.0.0.1:8000/parkingdata/id/6
    url(r'^parkingdata/id/(?P<pk>[0-9]+)/$',
        DetailsView.as_view(), name="details"),
    # get parkingplace with a certain uuid: http://127.0.0.1:8000/parkingdata/uuid/27ec369b-68d1-4b74-b62c-78969d6ff706/
    url(r'^parkingdata/uuid/(?P<uuid>.+)/$',
        UuidView.as_view(), name="uuid"),
    # get the static JSON data of a certain id in the database: http://127.0.0.1:8000/parkingdata/request/staticurl/27ec369b-68d1-4b74-b62c-78969d6ff706/
    url(r'^parkingdata/request/staticurl/(?P<uuid>.+)/$',
        get_static_url, name="static_Url"),
    # all parkingplaces within a certain rectangle: http://127.0.0.1:8000/parkingdata/rectangle/4.691669,52.239704,5.132495,52.461159/
    url(r"^parkingdata/rectangle/(?P<southwest_lng>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<southwest_lat>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<northeast_lng>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<northeast_lat>[+-]?([0-9]*[.])?[0-9]+)/$",
        RectangleView.as_view(), name="rectangle"),
    # all parkingplaces with no dynamic data link: http://127.0.0.1:8000/parkingdata/static/all/
    url(r'^parkingdata/static/all/$',
        StaticView.as_view(), name="static_Parkings"),
    # all parkingplaces with dynamic data link: http://127.0.0.1:8000/parkingdata/dynamic/all/
    url(r'^parkingdata/dynamic/all/$',
        DynamicView.as_view(), name="dynamic_Parkings"),

    # URLS for clickthrough thing
    url(r'^parkingdata/country/(?P<country_code>.+)/$',
        CountryView.as_view(), name="country_parkings"),
    url(r'^parkingdata/region/(?P<region_name>.+)/$',
        RegionView.as_view(), name="region_parkings"),
    url(r'^parkingdata/province/(?P<province_name>.+)/$',
        ProvinceView.as_view(), name="province_parkings"),
    url(r'^parkingdata/city/(?P<city_name>.+)/$',
        CityView.as_view(), name="city_parkings"),

    # Gives all parkings without locations
    url(r'^parkingdata/region/none/$',
        NoneView.as_view(), name="none_location"),

    url(r'^parkingdata/offstreet/all/$',
        OffstreetView.as_view(), name="offstreet_Parkings"),

    # testing purposes
    url(r'^parkingdata/requests/(?P<from_id>[0-9]+),(?P<to_id>[0-9]+)/$',
        get_multiple_static_url, name="multiple_StaticUrl"),

    # In the following
    # Summary of the country-level data: http://127.0.0.1:8000/parkingdata/summary/country/nl/
    url(r'^parkingdata/summary/country/(?P<country_code>.+)/$',
        api_view(["GET"])(lambda request, country_code: generic_summary_view("country_code", country_code, "region")), name="countrySummary"),
    # Summary of the region-level data: http://127.0.0.1:8000/parkingdata/summary/region/Zuid-Nederland/
    url(r'^parkingdata/summary/region/(?P<region>.+)/$',
        api_view(["GET"])(lambda request, region: generic_summary_view("region", region, "province")), name="regionSummary"),
    # Summary of the province-level data: http://127.0.0.1:8000/parkingdata/summary/province/Zeeland/
    url(r'^parkingdata/summary/province/(?P<province>.+)/$',
        api_view(["GET"])(lambda request, province: generic_summary_view("province", province, "city")), name="provinceSummary")
}


urlpatterns = format_suffix_patterns(urlpatterns)
