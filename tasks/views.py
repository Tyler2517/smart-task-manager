from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        # Remove owner-based filtering since authentication is removed
        return Task.objects.all()

    def perform_create(self, serializer):
        users = User.objects.all()
        if users:
            default_user = users.first()
        else:
            default_user = User.objects.create_user(username='default', password='default')
        serializer.save(owner=default_user)
