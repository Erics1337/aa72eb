from django.db import models
from django.db.models import Q


from . import utils
from .conversation import Conversation
from .user import User


class Participants(utils.CustomModel):
    userId = models.ForeignKey(
        User, on_delete=models.CASCADE, db_column="userId", related_name="+"
    )
    conversationId = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, db_column="conversationId", related_name="+", 
    )
    
    # Find conversations
    def find_conversations():
        # return conversation or None if it doesn't exist
        return Participants.objects.values('conversationId').distinct()

