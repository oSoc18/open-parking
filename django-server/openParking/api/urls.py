from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import DetailsView, UuidView, getStaticUrl, RectangleView, StaticView, DynamicView, CountryView, ProvinceView, CityView, OffstreetView


urlpatterns = {
    # get parkingplace with a certain id: http://127.0.0.1:8000/parkingdata/id/6
    url(r'^parkingdata/id/(?P<pk>[0-9]+)/$',
        DetailsView.as_view(), name="details"),
    # get parkingplace with a certain uuid: http://127.0.0.1:8000/parkingdata/uuid/27ec369b-68d1-4b74-b62c-78969d6ff706/
    url(r'^parkingdata/uuid/(?P<uuid>.+)/$',
        UuidView.as_view(), name="uuid"),
    # get the static JSON data of a certain id in the database: http://127.0.0.1:8000/parkingdata/request/staticurl/27ec369b-68d1-4b74-b62c-78969d6ff706/
    url(r'^parkingdata/request/staticurl/(?P<uuid>.+)/$',
        getStaticUrl, name="staticUrl"),
    # all parkingplaces within a certain rectangle: http://127.0.0.1:8000/parkingdata/rectangle/4.691669,52.239704,5.132495,52.461159/
    url(r"^parkingdata/rectangle/(?P<southwest_lng>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<southwest_lat>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<northeast_lng>[+-]?([0-9]*[.])?[0-9]+)," +\
        r"(?P<northeast_lat>[+-]?([0-9]*[.])?[0-9]+)/$",
        RectangleView.as_view(), name="rectangle"),
    # all parkingplaces with no dynamic data link: http://127.0.0.1:8000/parkingdata/static/all/
    url(r'^parkingdata/static/all/$',
        StaticView.as_view(), name="staticParkings"),
    # all parkingplaces with dynamic data link: http://127.0.0.1:8000/parkingdata/dynamic/all/
    url(r'^parkingdata/dynamic/all/$',
        DynamicView.as_view(), name="dynamicParkings"),
    url(r'^parkingdata/country/(?P<uuid>.+)/$',
        CountryView.as_view(), name="country_uuid"),
    url(r'^parkingdata/state//$',
        DynamicView.as_view(), name="dynamicParkings"),
    url(r'^parkingdata/offstreet/all/$',
        OffstreetView.as_view(), name="offstreetParkings"),
}


urlpatterns = format_suffix_patterns(urlpatterns)
