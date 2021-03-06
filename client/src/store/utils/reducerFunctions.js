export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  const isSender = () => message.senderId === payload.user.id ? true : false;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      latestMessageText: message.text,
      messages: [message],
      unreadCount: 1,
      readReceiptCount: 0
    };
    return [...state, newConvo];
  }
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = {
        ...convo,
        latestMessageText: message.text,
        messages:  [...convo.messages, message], 
        unreadCount: isSender() ? convo.unreadCount : convo.unreadCount + 1,
        readReceiptCount: isSender() ? convo.readReceiptCount + 1 : convo.readReceiptCount
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = {
        ...convo,
        id: message.conversationId,
        latestMessageText: message.text,
        messages: [message],
        unreadCount: 1
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const setReadMessages = (state, { conversationId, userId }) => {
	return state.map((convo) =>
		convo.id === conversationId ? {
					...convo,
					messages: convo.messages.map((message) =>
						message.senderId === userId
							? { ...message, read: true }
							: {...message}
					),
          unreadCount: 0
			  }
			: convo
	)
}

export const setReadReceipts = (state, { conversationId }) => {
	return state.map((convo) =>
		convo.id === conversationId ? {
					...convo,
          readReceiptCount: 0
			  }
			: convo
	)
}