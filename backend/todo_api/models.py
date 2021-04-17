from django.db import models


class Task(models.Model):
    """Create database for todo list"""

    titile = models.CharField(max_length=255)
    completed = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return self.titile
