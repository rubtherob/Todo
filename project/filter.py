from django_filters import rest_framework as filters

from project.models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')


    class Meta:
        model = Project
        fields = ['name']



class TodoFilter(filters.FilterSet):
    project = filters.CharFilter(lookup_expr='contains')
    create_timestamp = filters.DateFromToRangeFilter()


    class Meta:
        model = Todo
        fields = ['project', 'create_timestamp']
