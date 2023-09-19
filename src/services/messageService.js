import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const findMessageByReceiverAccountAndSenderAccount = createAsyncThunk(
    "messages/findMessageByReceiverAccountAndSenderAccount",
    async (object) => {
        const response = await customAxios.get("messages/findMessageByReceiverAccountAndSenderAccount/" + object.idReceiverAccount + "/" + object.idSenderAccount)
        return response.data;
    }
)

export const saveMessage = createAsyncThunk(
    'messages/receiveMessage',
    async (message) => {
        const response=await customAxios.post("/messages/save",message);
        return response.data;
    }
);

export const findListAccountYouMessaged=createAsyncThunk(
    "messages/findListAccountYouMessaged",
    async(idAccount)=>{
        const response=await customAxios.get("accounts/findAccountsYouMessaged/"+idAccount)
        return response.data;
    }
)
export const addAccountYouMessaged=createAsyncThunk(
    "messages/addAccountYouMessaged",
    async(account)=>{
        return account;
    }
)
export const send=createAsyncThunk(
    "messages/sendMessage",
    async(newMessage) => {
        return newMessage
    }
)

export const findAccountHostByUsername=createAsyncThunk(
    "messages/findAccountHost",
    async(username)=>{
        const reponse=await customAxios.get("/accounts/findAccountHost/"+username)
        return reponse.data;
    }
)

