from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import DetailsView, UuidView, RectangleView, StaticView, \
    DynamicView, AreaView, generic_summary_view, get_static_url, NoneView, \
    create_summary_view, get_dynamic_url
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
    url(r'^parkingdata/request/dynamicurl/(?P<uuid>.+)/$',
        get_dynamic_url, name="dynamic_Url"),

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
    url(r'^parkingdata/country/(?P<area_name>.+)/$',
        AreaView.as_view(area_level="country_code"), name="country_parkings"),
    url(r'^parkingdata/region/(?P<area_name>.+)/$',
        AreaView.as_view(area_level="region"), name="region_parkings"),
    url(r'^parkingdata/province/(?P<area_name>.+)/$',
        AreaView.as_view(area_level="province"), name="province_parkings"),
    url(r'^parkingdata/city/(?P<area_name>.+)/$',
        AreaView.as_view(area_level="city"), name="city_parkings"),

    # Gives all parkings without locations
    url(r'^parkingdata/region/none/$', NoneView.as_view(), name="none_location"),

    # Summary of the country-level data: http://127.0.0.1:8000/parkingdata/summary/country/nl/
    url(r'^parkingdata/summary/country/(?P<area_name>[^/]+)/$',
        create_summary_view("country_code", "region"), name="countrySummary"),
    # Summary of the region-level data: http://127.0.0.1:8000/parkingdata/summary/region/Zuid-Nederland/
    url(r'^parkingdata/summary/region/(?P<area_name>.+)/$',
        create_summary_view("region", "province"), name="regionSummary"),
    # Summary of the province-level data: http://127.0.0.1:8000/parkingdata/summary/province/Zeeland/
    url(r'^parkingdata/summary/province/(?P<area_name>.+)/$',
        create_summary_view("province", "city"), name="provinceSummary")
}


urlpatterns = format_suffix_patterns(urlpatterns)
