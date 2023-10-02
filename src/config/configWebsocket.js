import Stomp from 'stompjs';
import { addNotification, hasNotifiaction, saveNotification, } from '../services/notificationService';
import store from "../redux/store"
import { addAccountYouMessaged, send } from '../services/messageService';

const WebSocketConfig = {
    stompClient: null,

    connect: (account) => {
        const socket = new WebSocket('ws://45.117.177.92:8081/ws/websocket');
        WebSocketConfig.stompClient = Stomp.over(socket);
        WebSocketConfig.stompClient.connect({}, () => WebSocketConfig.onConnected(account), WebSocketConfig.onError);
    },

    onConnected: (account) => {
        WebSocketConfig.stompClient.subscribe('/private/' + account.id, WebSocketConfig.onMessageReceived)
    },

    onMessageReceived: (message) => {
        let newMessage = JSON.parse(message.body)
        const currentPath = window.location.pathname;
        if (newMessage.type === "MESSAGE") {
            if (currentPath !== `/myaccount/chat/${newMessage.senderAccount.id}`) {
                saveNotification({ content: (newMessage.senderAccount.fullName === null ? newMessage.senderAccount.username : newMessage.senderAccount.fullName) + ' has sent you a message', url: `/myaccount/chat/${newMessage.senderAccount.id}`, account: { id: newMessage.receiverAccount.id } })
                    .then((res) => {
                        store.dispatch(addNotification(res.data))
                        const listAccountYouMessaged=store.getState().message.listAccountYouMessaged;
                        let accountChat = listAccountYouMessaged.find(item => item.id == newMessage.senderAccount.id)
                        if (accountChat === undefined && newMessage.senderAccount.role.id!=1) {
                            store.dispatch(addAccountYouMessaged(newMessage.senderAccount))
                        }
                    })
                    .catch((err) => console.log(err))

            } else {
                store.dispatch(send(newMessage));
            }
        } else if (newMessage.type === "NOTIFICATION") {
            store.dispatch(addNotification(newMessage))
            store.dispatch(hasNotifiaction())
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
