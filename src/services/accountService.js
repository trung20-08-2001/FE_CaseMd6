import { createAsyncThunk } from "@reduxjs/toolkit";

export const login=createAsyncThunk(
    "account/login",
    async (account) => {
        return account;
    }
)