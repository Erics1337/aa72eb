from django.db import models
from django.db.models import Q

from . import utils
from .user import User
from .participants import Participants


class Conversation(utils.CustomModel):
    participants = models.ForeignKey(
        Participants, on_delete=models.CASCADE, db_column="userId", related_name="+"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)