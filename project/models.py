
from django.db import models

# Create your models here.
from todo import settings



class Project(models.Model):
    name = models.CharField(max_length=64)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL)
    repository = models.URLField(blank=True)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="project")
    text = models.TextField()
    create_timestamp = models.DateTimeField(auto_now_add=True)
    update_timestamp = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="user")
    is_active = models.BooleanField(default=True)