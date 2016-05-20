from rest_framework import serializers
from api.models import Post
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'post_type', 'by', 'site_host', 'score',
                  'url', 'text', 'published_date')


class UserSerializer(serializers.ModelSerializer):
    '''
    Serializer for creating new users
    '''

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
               username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password')
