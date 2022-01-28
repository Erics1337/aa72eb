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
  const { conversation, activeConversation, clearUnreadMessages, user} = props;
  const { otherUser } = conversation;
  
  
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    otherUser.username !== activeConversation && otherUser.username !== user.username &&
    clearUnreadMessages(conversation.id, conversation.otherUser.id, activeConversation)
  };
  

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
    activeConversation: state.activeConversation,
    user: state.user
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
