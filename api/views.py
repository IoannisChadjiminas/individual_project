from api.models import Post
from api.serializers import PostSerializer, UserSerializer
from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.permissions import AllowAny                      
from django.contrib.auth import get_user_model
from api.permissions import IsOwnerOrReadOnly
# Create your views here.


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
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
    Create a new User through API
    '''
    model = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
