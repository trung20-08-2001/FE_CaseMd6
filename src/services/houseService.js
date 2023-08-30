import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const saveHouse=createAsyncThunk(
    "houses/saveHouse",
    async(house)=>{
        // const response=await customAxios.post("/houses/save",house)
        return house;
    }
)
