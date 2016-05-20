from api.models import Post
from api.serializers import PostSerializer, UserSerializer
from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.permissions import AllowAny                       
from django.contrib.auth import get_user_model
# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    This viewset automatically provides 'list' and 'deatail' action
    '''
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CreateUserView(generics.CreateAPIView):
    '''
    Create User through API
    '''
    model = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
