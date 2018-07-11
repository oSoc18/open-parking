from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView
from .views import DetailsView, NameView, IDsView, NoNameView, UuidView, staticUrl


urlpatterns = {
    url(r'^parkingdata/$', CreateView.as_view(), name="create"),
    # getting parkingplace by id; parkingdata/id/512
    url(r'^parkingdata/id/(?P<pk>[0-9]+)/$',
        DetailsView.as_view(), name="details"),
    # getting parkingplace by name; parkingdata/name/Stadsplein
    url(r'^parkingdata/name/(?P<name>.+)/$', NameView.as_view(), name="name"),
    # all parkingplaces with a different name; parkingdata/name/reverse/Stadsplein
    url(r'^parkingdata/name/reverse/(?P<name>.+)/$',
        NameView.as_view(), name="inversed-name"),
    # all parkingplaces except for these in interval: use parkingplaces/interval/2to200
    url(r'^parkingdata/interval/(?P<id1>[0-9]+)to(?P<id2>[0-9]+)/$',
        IDsView.as_view(), name="ids"),
    # all parkingplaces except for these in interval: use parkingplaces/uuid/27ec369b-68d1-4b74-b62c-78969d6ff706
    url(r'^parkingdata/uuid/(?P<uuid>.+)/$',
        UuidView.as_view(), name="uuid"),
    url(r'^parkingdata/request/static/(?P<id>[0-9]+)/$',
        staticUrl, name="staticUrl"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
