from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient
# Create your tests here.
from project.models import Project
from project.views import ProjectModelViewSet


class TestProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = Project.objects.create(name='Test', pk=1, repository= 'https://www.django-rest-framework.org/api-guide/testing/#live-tests')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)