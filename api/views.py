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
from rest_framework.renderers import JSONRenderer
# Create your views here.


class PostList(generics.ListAPIView):
    '''
    View to list a post in the system
    '''
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]
    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """

        return Post.objects.filter(render_story=True).order_by('-score', '-published_date')


class PostCreate(generics.CreateAPIView):
    '''
    View create a post in the system
    '''
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    throttle_classes = (UserRateThrottle,)
    renderer_classes = [JSONRenderer]

    # when a post is created is associated with the authenticated author
    def perform_create(self, serializer):
        queryset = Post.objects.filter(url=self.request.data['url'])
        if (queryset.exists()):
            raise ValidationError('You have already posted this item')
        serializer.save(owner=self.request.user)


class PostScraperCreate(generics.CreateAPIView):
    '''
    View to create a post in the system
    '''
    permission_classes = (IsAuthenticated,)
    permission_classes = (IsAdminUser,)
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]
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
    queryset = Post.objects.all().order_by('-score_lol', '-published_date')
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]


class PostHappyList(generics.ListAPIView):
    '''
    View to list a post in the system
    '''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """
        return Post.objects.filter(render_story=True).order_by('-score_happy', '-published_date')


class PostWowList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """
        return Post.objects.filter(render_story=True).order_by('-score_wow', '-published_date')


class PostSadList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """
        return Post.objects.filter(render_story=True).order_by('-score_sad', '-published_date')


class PostAngryList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all().order_by('-score_angry', '-published_date')
    serializer_class = PostSerializer
    renderer_classes = [JSONRenderer]


class PostTimePublishedList(generics.ListAPIView):
    '''
    View to list or create a post in the system
    '''
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """
        return Post.objects.filter(render_story=True).order_by('-published_date')


class PostSubmittedByUser(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """
        return Post.objects.filter(render_story=False)


class PostSubmittedByUserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # When performing PUT through AJAX I am checking if there is a relation between the current post and
    # the current user. If there is not, then I increase the counter by one.
    def perform_update(self, serializer):
        post = Post.objects.get(pk=self.kwargs['pk'])
        renderer_classes = [JSONRenderer]

        if Voter.objects.filter(post=post.id, user=self.request.user).exists():
            voter_relation = Voter.objects.get(post=post.id, user=self.request.user)
            if (voter_relation.emotion == 2):
                if int(self.request.data['emotion']) == 2:
                    serializer.save(score=post.score, score_wow=post.score_wow, score_happy=post.score_happy, score_sad=post.score_sad)
                elif int(self.request.data['emotion']) == 3:
                    serializer.save(score=post.score, score_happy=post.score_happy -1, score_wow=post.score_wow +1, score_sad=post.score_sad)
                elif int(self.request.data['emotion']) == 4:
                    serializer.save(score=post.score, score_happy=post.score_happy -1, score_sad=post.score_sad +1, score_wow=post.score_wow)
            elif (voter_relation.emotion == 3):
                if int(self.request.data['emotion']) == 2:
                    serializer.save(score=post.score, score_wow=post.score_wow -1, score_happy=post.score_happy +1, score_sad=post.score_sad)
                elif int(self.request.data['emotion']) == 3:
                    serializer.save(score=post.score, score_wow=post.score_wow, score_happy=post.score_happy, score_sad=post.score_sad)
                elif int(self.request.data['emotion']) == 4:
                    serializer.save(score=post.score, score_wow=post.score_wow -1, score_sad=post.score_sad +1, score_happy=post.score_happy)
            elif (voter_relation.emotion == 4):
                if int(self.request.data['emotion']) == 2:
                    serializer.save(score=post.score, score_sad=post.score_sad -1, score_happy=post.score_happy +1, score_wow=post.score_wow)
                elif int(self.request.data['emotion']) == 3:
                    serializer.save(score=post.score, score_sad=post.score_sad -1, score_wow=post.score_wow +1, score_happy=post.score_happy)
                elif int(self.request.data['emotion']) == 4:
                    serializer.save(score=post.score, score_wow=post.score_wow, score_happy=post.score_happy, score_sad=post.score_sad)
        else:
            if int(self.request.data['emotion']) == 2:
                serializer.save(score=post.score+1, score_happy=post.score_happy +1, score_wow=post.score_wow, score_sad=post.score_sad)
            elif int(self.request.data['emotion']) == 3:
                serializer.save(score=post.score+1, score_happy=post.score_happy, score_wow=post.score_wow +1, score_sad=post.score_sad)
            elif int(self.request.data['emotion']) == 4:
                serializer.save(score=post.score+1, score_wow=post.score_wow, score_happy=post.score_happy, score_sad=post.score_sad +1)


class VoterList(generics.ListCreateAPIView):
    '''
    View to list or create a post in the system
    '''
    permission_classes = (IsAuthenticated,)
    queryset = Voter.objects.all()
    serializer_class = VoterSerializer
    renderer_classes = [JSONRenderer]

    #When user press an emoji button it saves the relation user-post to database
    #in order to restrict user to like more than one time a specific post
    #Also it checks to save it only one time
    def perform_create(self, serializer):
        if Voter.objects.filter(post=self.request.data['post'], user=self.request.user).exists():
            pass
        else:
            serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the currently user rankedstories
        for the currently authenticated user.
        """
        user = self.request.user
        return Voter.objects.filter(user=user)


class VoterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Voter.objects.all()
    serializer_class = VoterSerializer
    renderer_classes = [JSONRenderer]

    def perform_update(self, serializer):
        serializer.save(emotion=self.request.data['emotion'])


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    '''
    This viewset automatically provides 'list' and 'detail' action
    '''
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]


class CreateUserView(generics.CreateAPIView):
    '''
    Create a new User through API
    '''
    model = get_user_model()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]
