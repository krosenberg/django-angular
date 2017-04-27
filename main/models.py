from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Post(models.Model):
  title = models.CharField(max_length=256)
  text = models.TextField()
  createdAt = models.DateTimeField(auto_now=True)

  def to_json(self):
    return {
      'id': self.id,
      'title': self.title,
      'text': self.text,
      'createdAt': self.createdAt
    }
