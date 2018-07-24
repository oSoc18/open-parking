from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import IdView, UuidView, RectangleView, AreaView, \
        generic_summary_view, NoneView, create_summary_view, \
        get_dynamic_data, get_html_page
from rest_framework.decorators import api_view


urlpatterns = {
    # get parkingplace with a certain id: http://127.0.0.1:8000/parkingdata/id/6
    url(r'^parkingdata/id/(?P<pk>[0-9]+)/$', IdView.as_view(), name="id"),
    # get parkingplace with a certain uuid: http://127.0.0.1:8000/parkingdata/uuid/27ec369b-68d1-4b74-b62c-78969d6ff706/
    url(r'^parkingdata/uuid/(?P<uuid>.+)/$', UuidView.as_view(), name="uuid"),
    # get dynamic data from a certain uuid: http://127.0.0.1:8000/parkingdata/dynamicdata/2c0c337e-7c19-4db5-9da8-6bcc8e635404/
    url(r'^parkingdata/dynamicdata/(?P<uuid>.+)/$', get_dynamic_data, name="dynamic_data"),

    # all parkingplaces within a certain rectangle: http://127.0.0.1:8000/parkingdata/rectangle/4.691669,52.239704,5.132495,52.461159/
    url(r"^parkingdata/rectangle/(?P<southwest_lng>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<southwest_lat>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<northeast_lng>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<northeast_lat>[+-]?([0-9]*[.])?[0-9]+)/$",
        RectangleView.as_view(), name="rectangle"),

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
        create_summary_view("country_code", "region"), name="country_summary"),
    # Summary of the region-level data: http://127.0.0.1:8000/parkingdata/summary/region/Zuid-Nederland/
    url(r'^parkingdata/summary/region/(?P<area_name>.+)/$',
        create_summary_view("region", "province"), name="region_summary"),
    # Summary of the province-level data: http://127.0.0.1:8000/parkingdata/summary/province/Zeeland/
    url(r'^parkingdata/summary/province/(?P<area_name>.+)/$',
        create_summary_view("province", "city"), name="province_summary"),

    # get a full html page with details of the parking
    url(r'^parkingdata/html/(?P<uuid>.+)/$', get_html_page, name="html_page"),
}


urlpatterns = format_suffix_patterns(urlpatterns)
