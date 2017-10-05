from django.conf.urls import include, url
from django_comments_xtd.views import reply
from .decorators import require_ajax

urlpatterns = [
    url(r'^reply/(?P<cid>[\d]+)/$', require_ajax(reply), name='comments-xtd-reply'),
    url(r'', include("django_comments_xtd.urls")),
]
