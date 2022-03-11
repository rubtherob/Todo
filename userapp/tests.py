from django.test import TestCase

# Create your tests here.
from mixer.auto import mixer
from rest_framework import status
from rest_framework.test import APITestCase
from project.models import Project, Todo
from userapp.models import User





class TestTodoViewSet(APITestCase):


    def test_edit_mixer(self):
        todo = mixer.blend(Todo)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.id}/', {'text': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = todo.objects.get(id=todo.id)
        self.assertEqual(todo.name, 'Test')