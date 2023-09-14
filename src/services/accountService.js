import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const login=createAsyncThunk(
    "account/login",
    async (account) => {
        return account;
    }
)

export const findListAccountUsers = createAsyncThunk(
    "account/findListAccountUsers",
    async () => {
        const response = await customAxios.get("admin/findAccountUsers");
        return response.data;
    }
)

export const changeStatusAccount= createAsyncThunk(
    "account/changeStatusAccount",
    async (account) => {
        return account;
    }
)


export const findAccountAdmin=createAsyncThunk(
    "account/findAccountAdmin",
    async ()=>{
        const response=await customAxios.get("accounts/findAccountAdmin")
        return response.data;
    }
)

export const findAccountsHost=createAsyncThunk(
    "account/findAccountsHost",
    async()=>{
        const response=await customAxios.get("accounts/findAccountHost");
        return response.data;
    }
)

export const findAccountsUserMessageToAccountHost=createAsyncThunk(
    "account/findAccountsUserMessageToAccountHost",
    async(idAccountHost)=>{
        const response=await customAxios.get("accounts/findAccountsUserMessageToAccountHost/" + idAccountHost);
        return response.data;
    }
)


export const findAccountById=createAsyncThunk(
    "account/findAccountById",
    async(idAccount)=>{
        const  response = await customAxios.get("accounts/searchAccount/" + idAccount);
        return response.data;
    }
)