from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TaskSerializer
from .models import Task


@api_view(['GET'])
def api_overview(request):
    """Return url list"""

    api_urls = {
        'LIST': '/task-list/',
        'DETAIL VIEW': 'task-detail/<str:pk>/',
        'CREATE': '/task-create/',
        'UPDATE': '/task-update/<str:pk>/',
        'DELETE': '/task-delete.<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def task_list(request):
    """Return task list as JsonRespose"""

    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def task_detail(request, pk):
    """return detail task as JssonResponse"""

    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def task_create(request):
    """create and save new task to the database"""

    serailizer = TaskSerializer(data=request.data)
    if serailizer.is_valid():
        serailizer.save()

    return Response(serailizer.data)


@api_view(['POST'])
def task_update(request, pk):
    """Update a task from tasks list"""

    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def task_delete(request, pk):
    """Delete a task from task List"""

    task = Task.objects.get(id=pk)
    task.delete()

    return Response('Item Deleted')
