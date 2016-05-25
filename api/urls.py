from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from api import views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^post/$', views.PostList.as_view()),
    url(r'^post/(?P<pk>[0-9]+)/$', views.PostDetail.as_view()),
    url(r'^voter/$', views.VoterList.as_view()),
    url(r'^voter/(?P<pk>[0-9]+)/$', views.VoterDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
    url(r'^', include(router.urls)),
    url(r'^register/$', views.CreateUserView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls',
        namespace='rest_framework'))
    ]

# This is a view that returns tokes if you pass valid username/password
urlpatterns += [url(r'^obtain-auth-token/$', obtain_auth_token)]
