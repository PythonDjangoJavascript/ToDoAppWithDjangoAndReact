from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TaskSerializer
from .models import Task


@api_view(['GET'])
def api_overview(request):
    """Return url list"""

    api_urls = {
        'LIST': '/task-list/',
        'DETAIL VIEW': '/task-detail/<str:pk>/',
        'CREATE': '/task-create/',
        'UPDATE': '/task-update/<str:pk>/',
        'DELETE': '/task-delete.<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def api_list(request):
    """Return task list as JsonRespose"""

    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)
