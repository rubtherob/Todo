import graphene
from graphene import Schema

from graphene_django import DjangoObjectType
from userapp.models import User
from project.models import Todo, Project



class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):

    todos = graphene.List(TodoType)
    projects = graphene.List(ProjectType)
    users = graphene.List(UserType)

    def resolve_todos(root, info):
        return Todo.objects.all()

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_users(root, info):
        return User.objects.all()


schema = Schema(query=Query)