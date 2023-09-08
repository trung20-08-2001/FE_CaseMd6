import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const findRevenueOfHost=createAsyncThunk(
    "revenue/findRevenueOfHost",
    async(idHost)=>{
        const respone=await customAxios.get("/findRevenueOfHost/"+idHost)
        return respone.data;
    }
)