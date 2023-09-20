import Stomp from 'stompjs';
import { saveNotification, } from '../services/notificationService';
import store from "../redux/store"
import { send } from '../services/messageService';


const WebSocketConfig = {
    stompClient: null,

    connect: (account) => {
        const socket = new WebSocket('ws://localhost:8081/ws/websocket');
        WebSocketConfig.stompClient = Stomp.over(socket);
        WebSocketConfig.stompClient.connect({}, () => WebSocketConfig.onConnected(account), WebSocketConfig.onError);
    },

    onConnected: (account) => {
        // WebSocketConfig.stompClient.subscribe('/private/messages', WebSocketConfig.onMessageReceived);
        WebSocketConfig.stompClient.subscribe('/private/' + account.id, WebSocketConfig.onMessageReceived)
    },

    onMessageReceived: (message) => {
        let newMessage = JSON.parse(message.body)
        const currentPath = window.location.pathname;
        if (newMessage.type === "MESSAGE") {
            if (newMessage.senderAccount.role.id !== 1) {
                store.dispatch(send(newMessage));
            } else if (currentPath !== `/myaccount/chat/${newMessage.senderAccount.id}`) {
                store.dispatch(saveNotification({ content: newMessage.senderAccount.fullName===null?newMessage.senderAccount.username:newMessage.senderAccount.fullName + ' has sent you a message', url: `/myaccount/chat/${newMessage.senderAccount.id}`, account: { id: newMessage.receiverAccount.id } }))
            } else {
                store.dispatch(send(newMessage));
            }

        } else if (newMessage.type === "NOTIFICATION") {
            store.dispatch(saveNotification(newMessage))
        }
    },

    sendMessage: (channel, message) => {
        const payload = JSON.stringify(message);
        WebSocketConfig.stompClient.send(channel, {}, payload);
    },

    onError: (error) => {
        console.log(error);
    },

    disconnect: () => {
        if (WebSocketConfig.stompClient !== null) {
            WebSocketConfig.stompClient.disconnect();
        }
    },
};

export default WebSocketConfig;
