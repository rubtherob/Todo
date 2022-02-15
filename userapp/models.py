from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from project.models import Project


class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=64)
