import Stomp from 'stompjs';
import store from "../redux/store"
import { addMessage, addNotification } from '../services/messageService';

const WebSocketConfig = {
    stompClient: null,

    connect: (account) => {
        const socket = new WebSocket('ws://localhost:8081/ws/websocket');
        WebSocketConfig.stompClient = Stomp.over(socket);
        WebSocketConfig.stompClient.connect({}, () => WebSocketConfig.onConnected(account), WebSocketConfig.onError);
    },

    onConnected: (account) => {
        // Xử lý logic sau khi kết nối thành công
        // WebSocketConfig.stompClient.subscribe('/private/messages', WebSocketConfig.onMessageReceived);
        WebSocketConfig.stompClient.subscribe('/private/' + account.id, WebSocketConfig.onMessageReceived)
    },

    onMessageReceived: (message) => {
        let newMessage = JSON.parse(message.body)
        if (newMessage.type === "MESSAGE") {
            store.dispatch(addMessage(newMessage));
        }else if(newMessage.type==="NOTIFICATION"){
            store.dispatch(addNotification(newMessage))
        }      
    },

    sendMessage: (channel, message) => {
        const payload = JSON.stringify(message);
        WebSocketConfig.stompClient.send(channel, {}, payload);
    },

    onError: (error) => {
        console.log(error);
        // Xử lý logic khi có lỗi
    },

    disconnect: () => {
        if (WebSocketConfig.stompClient !== null) {
            WebSocketConfig.stompClient.disconnect();
        }
        console.log('Disconnected');
    },
};

export default WebSocketConfig;
