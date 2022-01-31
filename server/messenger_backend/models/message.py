from django.db import models

from . import utils
from .conversation import Conversation
from .user import User


class Message(utils.CustomModel):
    text = models.TextField(null=False)
    userId = models.ForeignKey(
        User, on_delete=models.CASCADE, db_column="userId", related_name="+"
    )
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="messages",
        related_query_name="message"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)
    read = models.BooleanField(default=False)