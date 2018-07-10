from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView
from .views import DetailsView, NameView


urlpatterns = {
    url(r'^parkingdata/$', CreateView.as_view(), name="create"),
    url(r'^parkingdata/(?P<pk>[0-9]+)/$',
        DetailsView.as_view(), name="details"),
    url(r'^parkingdata/(?P<name>.+)/$', NameView.as_view(), name="name"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
