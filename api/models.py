from django.db import models
import datetime
from django.utils.timezone import utc
# Create your models here.


class Post (models.Model):
    owner = models.ForeignKey('auth.User', related_name='posts')
    title = models.CharField(max_length=100, default='title')
    post_type = models.CharField(max_length=100, default='type')
    score_lol = models.IntegerField(default=0)
    score_happy = models.IntegerField(default=0)
    score_wow = models.IntegerField(default=0)
    score_sad = models.IntegerField(default=0)
    score_angry = models.IntegerField(default=0)
    emotion = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    enable_score = models.CharField(max_length=5, default="True")
    url = models.URLField(max_length=200, default='url')
    text = models.TextField(default=0)
    published_date = models.DateTimeField(auto_now_add=True)
    time_difference = models.IntegerField(default=0)

    def get_time_diff(self):
        if self.published_date:
            now = datetime.datetime.utcnow().replace(tzinfo=utc)
            timediff = now - self.published_date
            return timediff.total_seconds()

   # class Meta:
    #    ordering = ('-score',)


class Voter (models.Model):
    user = models.ForeignKey('auth.User', related_name="votes")
    post = models.IntegerField(default=0)


