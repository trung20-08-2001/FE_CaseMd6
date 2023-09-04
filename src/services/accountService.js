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
        const response = await customAxios("admin/findAccountUsers");
        return response.data;
    }
)