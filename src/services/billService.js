import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const findBillHistoryHost = createAsyncThunk(
    "bill/billHistoryHost",
    async(idHost)=>{
        const response=await customAxios.get("/bills_vendor/" + idHost)
        return response.data;
    }
)

export const updateBillsHost=createAsyncThunk(
    "bill/updateBillsHost",
    async(updateBills)=>{
        return updateBills;
    }
)