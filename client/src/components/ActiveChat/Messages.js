import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, user, unreadCount } = props;

  const lastRead = (index, unreadCount) => {
    let flag = 0;
    if (unreadCount > 0) {
    for (let i = messages.length-1; i >= 0; i--) {
      // if the message is unread and the index of the mapped message is that of the last unread message, return true, else false
      if (!messages[i].read && messages[i].senderId === user.id) {
        if (flag === unreadCount-1) {
          return i === index
        }
        flag++;
      }
    }
  }
    // find last message from sender if there are no unread messages
    else if (unreadCount === 0) {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].senderId === user.id) {
          return i === index
        }
      }
    }
    // if no messages, return false
    return false;
  }

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");
        
        return message.senderId === user.id ? (
          <SenderBubble key={index} text={message.text} time={time} user={user} unreadCount={unreadCount}
            otherUser={otherUser} lastRead={lastRead(index, unreadCount)}
          />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} 
          />
        );
      })
      }
    </Box>
  );
};

export default Messages;
