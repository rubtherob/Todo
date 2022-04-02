from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from project.models import Project, Todo
from .models import User


class UserModelSerializer(ModelSerializer):

   class Meta:
       model = User
       fields = ('username', 'first_name', 'last_name', 'email', 'id')


class UserBaseModelSerializer(ModelSerializer):

   class Meta:
       model = User
       fields = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser', 'id')

class ProjectModelSerializer(ModelSerializer):

   class Meta:
       model = Project
       fields = '__all__'

class TodoModelSerializer(ModelSerializer):

   class Meta:
       model = Todo
       fields = '__all__'