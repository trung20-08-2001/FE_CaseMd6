import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBillHistoryHost = createAsyncThunk(
    "bill/billHistoryHost",
    async(bills_vendor)=>{
        return bills_vendor;
    }
)

export const addBillHistoryUser=createAsyncThunk(
    "bill/addBillHistoryUser",
    async(bills_user)=>{
        return bills_user;
    }
)

export const updateBillsHost=createAsyncThunk(
    "bill/updateBillsHost",
    async(updateBills)=>{
        return updateBills;
    }
)

export const filterNameHouse=createAsyncThunk(
    "bill/filterNameHouse",
    async(nameHouse)=>{
        return nameHouse
    }
)

export const filterDateCheckin=createAsyncThunk(
    "bill/filterDateCheckin",
    async(dateCheckin)=>{
        return dateCheckin
    }
)

export const filterDateCheckout=createAsyncThunk(
    "bill/filterDateCheckout",
    async(dateCheckout)=>{
        console.log(dateCheckout);
        return dateCheckout;
    }
)

export const filterStatus=createAsyncThunk(
    "bill/filterStatus",
    async(status)=>{
        return status;
    }
)