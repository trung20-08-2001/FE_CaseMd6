import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const findMessageByReceiverAccountAndSenderAccount = createAsyncThunk(
    "messages/findMessageByReceiverAccountAndSenderAccount",
    async (object) => {
        const response = await customAxios.get("messages/findMessageByReceiverAccountAndSenderAccount/" + object.idReceiverAccount + "/" + object.idSenderAccount)
        return response.data;
    }
)

export const receiveMessage = createAsyncThunk(
    'messages/receiveMessage',
    async (message) => {
        return message;
    }
);