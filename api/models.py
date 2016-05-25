from django.db import models
# Create your models here.


class Post (models.Model):
    owner = models.ForeignKey('auth.User', related_name='posts')
    title = models.CharField(max_length=100, default='title')
    post_type = models.CharField(max_length=100, default='type')
    by = models.CharField(max_length=100, default='by')
    site_host = models.CharField(max_length=100, default='host')
    score = models.IntegerField(default=0)
    enable_score = models.CharField(max_length=5, default="True")
    url = models.CharField(max_length=200, default='url')
    text = models.TextField(default=0)
    published_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('score',)


class Voter (models.Model):
    user = models.ForeignKey('auth.User', related_name="votes")
    post = models.IntegerField(default=0)
