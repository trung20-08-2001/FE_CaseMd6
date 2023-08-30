import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const saveImage = createAsyncThunk(
    "image/save",
    async(image)=>{
        console.log(image);
        const response= await customAxios.post('/images/save',image)
        return response.data;
    }
)

export const saveImageURL= createAsyncThunk(
    "image/saveImageURL",
    async(imageURL)=>{
        console.log(imageURL);
        return imageURL;
    }
)