from django.db import models
# Create your models here.


class Post (models.Model):
    author = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    text = models.TextField()
    published_date = models.DateTimeField()
