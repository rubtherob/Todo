from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User
from .Serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer