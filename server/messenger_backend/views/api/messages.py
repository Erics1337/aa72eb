from django.contrib.auth.middleware import get_user
from django.http import HttpResponse, JsonResponse
from messenger_backend.models import Conversation, Message, User
from online_users import online_users
from rest_framework.views import APIView
from django.db.models import Q
from django.forms.models import model_to_dict



class Messages(APIView):
    """expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)"""

    def post(self, request):
        try:
            user = get_user(request)

            if user.is_anonymous:
                return HttpResponse(status=401)

            sender_id = user.id
            body = request.data
            senderName = body.get("senderName")
            conversation_id = body.get("conversationId")
            text = body.get("text")
            recipient_id = body.get("recipientId")
            sender = body.get("sender")

            # if we already know conversation id, we can save time and just add it to message and return
            if conversation_id:
                conversation = Conversation.objects.filter(id=conversation_id).first()
                message = Message(
                    senderId=sender_id, text=text, conversation=conversation
                )
                message.save()
                message_json = message.to_dict()
                return JsonResponse({"message": message_json, "sender": body["sender"], 'senderName': senderName})

            # if we don't have conversation id, find a conversation to make sure it doesn't already exist
            conversation = Conversation.find_conversation(sender_id, recipient_id)
            if not conversation:
                # create conversation
                conversation = Conversation(user1_id=sender_id, user2_id=recipient_id)
                conversation.save()

                if sender and sender["id"] in online_users:
                    sender["online"] = True

            message = Message(senderId=sender_id, text=text, conversation=conversation)
            message.save()
            message_json = message.to_dict()
            return JsonResponse({"message": message_json, "sender": sender, 'senderName': senderName})
        except Exception as e:
            return HttpResponse(status=500)

    # Set read status for all messages in conversation for given user
        """expects {conversationId, senderId } in body"""
    def put(self, request):
        try:
            user = get_user(request)

            body = request.data
            conversation_id = body.get("conversationId")
            senderId = body.get("senderId")
            userId = user.id
            
            
            # convo = Conversation.objects.filter(id=conversation_id)
            # if convo.exists():

            inConvo = Conversation.objects.filter(id=conversation_id).filter(Q(user1=userId) | Q(user2=userId)).exists()
            if user.is_anonymous or not inConvo:
                return HttpResponse(status=401)


            Message.objects.filter(senderId=senderId, conversation_id=conversation_id, read=False).update(read=True)
            return HttpResponse(status=204)

        except Exception as e:
            return HttpResponse(status=500)
