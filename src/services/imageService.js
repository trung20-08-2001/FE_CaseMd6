import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";


export const updateImageHouse=createAsyncThunk(
    "image/updateImageHouse",
    async(idAccount,images)=>{
       const response= customAxios.post("/images/updateImageHouse/"+idAccount,images)
       return response.data;
    }
)