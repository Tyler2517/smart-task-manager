from django.test import TestCase
from .models import Task
from django.contrib.auth.models import User

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

