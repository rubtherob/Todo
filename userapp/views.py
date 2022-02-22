from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer


class UserListAPIView(ListAPIView):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   queryset = User.objects.all()
   serializer_class = UserModelSerializer


class UserRetrieveAPIView(RetrieveAPIView):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   queryset = User.objects.all()
   serializer_class = UserModelSerializer