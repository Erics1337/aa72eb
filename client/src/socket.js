import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { clearUnreadMessages } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", async (data) => {
    if (store.getState().activeConversation === data.senderName) {
      data.message.read = true
      store.dispatch(setNewMessage(data.message, data.sender));
      store.dispatch(clearUnreadMessages(data.message.conversationId, data.message.senderId))
    } else 
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("read-receipt", async (data) => {
    if (data.senderId === store.getState().user.id) {
      store.dispatch(clearUnreadMessages(data.conversationId, store.getState().user.id))
    }
  });
});

export default socket;
