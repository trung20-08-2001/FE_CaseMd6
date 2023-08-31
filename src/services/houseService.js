import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const saveHouse=createAsyncThunk(
    "houses/saveHouse",
    async(house)=>{
        // const response=await customAxios.post("/houses/save",house)
        return house;
    }
)


export const findHouseByAccount=createAsyncThunk(
    "houses/myHouses",
    async(idAccount)=>{
        const response=await customAxios.get("/houses/findHouseByAccount/"+idAccount)
        return response.data;
    }
)