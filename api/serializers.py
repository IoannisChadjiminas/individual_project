from rest_framework import serializers
from api.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'post_type', 'by', 'site_host', 'score',
                  'url', 'text', 'published_date')
