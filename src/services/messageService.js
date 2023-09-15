import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";
import { async } from "q";

export const findMessageByReceiverAccountAndSenderAccount = createAsyncThunk(
    "messages/findMessageByReceiverAccountAndSenderAccount",
    async (object) => {
        const response = await customAxios.get("messages/findMessageByReceiverAccountAndSenderAccount/" + object.idReceiverAccount + "/" + object.idSenderAccount)
        return response.data;
    }
)

export const addMessage = createAsyncThunk(
    'messages/receiveMessage',
    async (message) => {
        return message;
    }
);


export const addNotification = createAsyncThunk(
    "messages/addNotification",
    async(message)=>{
        return message;
    }
)