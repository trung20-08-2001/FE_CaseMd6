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

export const filterPriceHouse=createAsyncThunk(
    "house/filterPriceHouse",
    async(priceHouse)=>{
        return priceHouse
    })

export const  filterNameAddress=createAsyncThunk(
    "house/filterNameAddress",
    async(nameAddress)=>{
        return nameAddress
    }
)

export const filterBathroom=createAsyncThunk(
    "house/filterBathroom",
    async(bathroom)=>{
        return bathroom
    }
)

export const filterBedroom=createAsyncThunk(
    "house/filterBedroom",
    async(bedroom)=>{
        return bedroom
    })


