from api.models import Post
from api.serializers import PostSerializer, UserSerializer
from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth.models import User
# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    This viewset automatically provides 'list' and 'deatail' action
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer
