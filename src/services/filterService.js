import { createAsyncThunk } from "@reduxjs/toolkit";

export const filterStatusHouse=createAsyncThunk(
    "house/filterStatusHouse",
    async(nameStatus)=>{
        return nameStatus;
    }
)

export const nameHouseSearch=createAsyncThunk(
    "house/nameHouseSearch",
    async(name)=>{
        return name;
    }
)