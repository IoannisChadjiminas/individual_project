from api.models import Post, Voter
from api.serializers import PostSerializer, UserSerializer, VoterSerializer
from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.permissions import AllowAny              
from django.contrib.auth import get_user_model
from api.permissions import IsOwnerOrReadOnly
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.response import Response
from django.core.exceptions import ValidationError

# Create your views here.


class PostList(generics.ListAPIView):
    '''
    View to list a post in the system
    '''
    queryset = Post.objects.all().order_by('-score')
    serializer_class = PostSerializer


class PostCreate(generics.CreateAPIView):
    '''
    View create a post in the system
    '''
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    # throttle_classes = (UserRateThrottle,)

    # when a post is created is associated with the authenticated author
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostScraperCreate(generics.CreateAPIView):
    '''
    View to create a post in the system
    '''
    permission_classes = (IsAuthenticated,)
    permission_classes = (IsAdminUser,)
    serializer_class = PostSerializer
    # when a post is created is associated with the authenticated author

    def perform_create(self, serializer):
        queryset = Post.objects.filter(url=self.request.data['url'])
        if (queryset.exists()):
            raise ValidationError('You have already posted this item')
        serializer.save(owner=self.request.user)


class PostLolList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all().order_by('-score_lol')
    serializer_class = PostSerializer


class PostHappyList(generics.ListAPIView):
    '''
    View to list a post in the system
    '''
    queryset = Post.objects.all().order_by('-score_happy')
    serializer_class = PostSerializer


class PostWowList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all().order_by('-score_wow')
    serializer_class = PostSerializer


class PostSadList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all().order_by('-score_sad')
    serializer_class = PostSerializer


class PostAngryList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all().order_by('-score_angry')
    serializer_class = PostSerializer


class PostTimePublishedList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all().order_by('-published_date')
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)  # IsOwnerOrReadOnly
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # When performing PUT through AJAX I am checking if there is a relation between the current post and
    # the current user. If there is not, then I increase the counter by one.

    def perform_update(self, serializer):
        post = Post.objects.get(pk=self.kwargs['pk'])
        
        if Voter.objects.filter(post=post.id, user=self.request.user).exists():
            if (post.emotion == 2):
                serializer.save(score=int(post.score) -1, score_lol=int(post.score_happy) -1)
            elif (post.emotion == 3):
                serializer.save(score=int(post.score) -1, score_lol=int(post.score_wow) -1)
            elif (post.emotion == 4):
                serializer.save(score=int(post.score) -1, score_lol=int(post.score_sad) -1)
       
        if int(self.request.data['emotion']) == 1:
                serializer.save(score=int(self.request.data['score']) +1, score_lol=int(self.request.data['score_lol']) +1)
        elif int(self.request.data['emotion']) == 2:
                serializer.save(score=int(self.request.data['score']) +1, score_happy=int(self.request.data['score_happy']) +1)
        elif int(self.request.data['emotion']) == 3:
                serializer.save(score=int(self.request.data['score']) +1, score_wow=int(self.request.data['score_wow']) +1)
        elif int(self.request.data['emotion']) == 4:
                serializer.save(score=int(self.request.data['score']) +1, score_sad=int(self.request.data['score_sad']) +1)
        else:
                serializer.save(score=int(self.request.data['score']) +1, score_angry=int(self.request.data['score_angry']) +1)


    '''
    def perform_update(self, serializer):
        post = Post.objects.get(pk=self.kwargs['pk'])
        if Post.objects.filter(enable_score="True", id=post.id):
            serializer.save(score=int(self.request.data['score'])+1)
    '''


class VoterList(generics.ListCreateAPIView):
    '''
    View to list or create a post in the system
    '''
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Voter.objects.all()
    serializer_class = VoterSerializer

    #When user press an emoji button it saves the relation user-post to database
    #in order to restrict user to like more than one time a specific post
    #Also it checks to save it only one time
    def perform_create(self, serializer):
        if Voter.objects.filter(post=self.request.data['post'], user=self.request.user).exists():
            pass
        else:
            serializer.save(user=self.request.user)


class VoterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voter.objects.all()
    serializer_class = VoterSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    This viewset automatically provides 'list' and 'detail' action
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
