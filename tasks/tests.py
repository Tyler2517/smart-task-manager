from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Task
from django.test import TestCase
from model_bakery import baker

class TaskModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.task = Task.objects.create(
            title="Test Task",
            description="This is a test task.",
            due_date="2024-12-01T12:00:00Z",
            priority=1,
            owner=self.user
        )

    def test_task_creation(self):
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.owner.username, "testuser")
        self.assertFalse(self.task.completed)

    def test_task_str_representation(self):
        self.assertEqual(str(self.task), "Test Task")

class TaskViewSetTestCase(APITestCase):
    def setUp(self):
        self.user1 = baker.make('auth.User')
        self.user2 = baker.make('auth.User')
        self.task1 = baker.make('tasks.Task', owner=self.user1)
        self.task2 = baker.make('tasks.Task', owner=self.user2)
        self.client = APIClient()

    def test_get_tasks(self):
        # Log in as user1
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(reverse('task-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.task1.id)

        # Log in as user2
        self.client.force_authenticate(user=self.user2)
        response = self.client.get(reverse('task-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.task2.id)

    def test_create_task(self):
        # Log in as user1
        self.client.force_authenticate(user=self.user1)
        data = {'title': 'New Task', 'description': 'New Description', 'priority': 1, 'due_date': '2024-12-01T12:00:00Z', 'owner': self.user1.id}
        response = self.client.post(reverse('task-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Task')
        self.assertEqual(response.data['owner'], self.user1.id)

    def test_update_task(self):
        # Log in as user1
        self.client.force_authenticate(user=self.user1)
        data = {'title': 'Updated Task'}
        response = self.client.patch(reverse('task-detail', kwargs={'pk': self.task1.id}), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Task')

    def test_delete_task(self):
        # Log in as user1
        self.client.force_authenticate(user=self.user1)
        response = self.client.delete(reverse('task-detail', kwargs={'pk': self.task1.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
