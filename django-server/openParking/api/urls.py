from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView
from .views import DetailsView, NameView, IDsView, NoNameView


urlpatterns = {
    url(r'^parkingdata/$', CreateView.as_view(), name="create"),
    # getting parkingplace by id; parkingdata/id512
    url(r'^parkingdata/id(?P<pk>[0-9]+)/$',
        DetailsView.as_view(), name="details"),
    # getting parkingplace by name; parkingdata/Stadsplein
    url(r'^parkingdata/(?P<name>.+)/$', NameView.as_view(), name="name"),
    # all parkingplaces with a different name
    url(r'^parkingdata/inv(?P<name>.+)/$',
        NameView.as_view(), name="inversed-name"),
    # all parkingplaces except for these in interval: use parkingplaces/interval/2to200
    url(r'^parkingdata/interval/(?P<id1>[0-9]+)to(?P<id2>[0-9]+)/$',
        IDsView.as_view(), name="ids"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
