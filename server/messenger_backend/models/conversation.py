from django.db import models
from django.db.models import Q

from . import utils


class Conversation(utils.CustomModel):
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)