import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";

import { connect } from "react-redux";
import { clearUnreadMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, activeConversation, clearUnreadMessages } = props;
  const { otherUser } = conversation;
  
  const [unreadMessages, setUnreadMessages] = useState(0);

  
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);

  };
  
  
  useEffect(() => {
    console.log('activeConversation', activeConversation)
    if(activeConversation === conversation.otherUser.username) {
    setUnreadMessages(
      conversation.messages.filter((message) => message.readByRecipient === false 
        && message.senderId === conversation.otherUser.id).length
    )
    }
    if (unreadMessages > 0) {
      console.log('unreadMessages', unreadMessages)
        clearUnreadMessages(conversation.id, conversation.otherUser.id)
    }
  
    
  }, [unreadMessages, conversation, activeConversation, clearUnreadMessages]);


  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    clearUnreadMessages: (conversationId, senderId) => {
      dispatch(clearUnreadMessages(conversationId, senderId))
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
