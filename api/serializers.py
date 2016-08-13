from rest_framework import serializers
from api.models import Post, Voter
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    time_difference = serializers.ReadOnlyField(source='get_time_diff')

    class Meta:
        model = Post
        fields = ('id', 'enable_score', 'owner', 'title', 'post_type',
                  'score', 'score_angry', 'score_sad', 'snippet', 'text',
                  'score_wow', 'score_lol', 'score_happy', 'url', 'emotion',
                  'published_date', 'time_difference', 'image_src')


class UserSerializer(serializers.ModelSerializer):
    '''
    Serializer for creating new users
    '''

    password = serializers.CharField(write_only=True)
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())

    def create(self, validated_data):
        user = get_user_model().objects.create(
               username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'posts')


class VoterSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Voter
        fields = ('id', 'post', 'user', 'emotion_num')
