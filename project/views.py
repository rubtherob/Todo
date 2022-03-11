from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.mixins import ListModelMixin, DestroyModelMixin
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from project.filter import ProjectFilter, TodoFilter
from project.models import Project, Todo
from project.pagination import ProjectSetPagination, TodoSetPagination
from userapp.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectModelViewSet(ModelViewSet):
   queryset = Project.objects.all()
   serializer_class = ProjectModelSerializer
   # pagination_class = ProjectSetPagination
   filterset_class = ProjectFilter
   # permission_classes = [IsAuthenticated]


class TodoModelViewSet(ModelViewSet):
   queryset = Todo.objects.all()
   serializer_class = TodoModelSerializer
   # pagination_class = TodoSetPagination
   filterset_class = TodoFilter

   def destroy(self, request, pk=None):
      self.object = self.get_object()
      self.object.is_active = False
      self.object.save()
      return HttpResponseRedirect(redirect_to='http://127.0.0.1:8000/api/todos/')