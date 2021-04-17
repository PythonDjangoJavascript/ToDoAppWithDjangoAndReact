from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """Serialize task model"""

    class Meta:
        model = Task
        fields = '__all__'
