import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";


export const findImageBanner = createAsyncThunk(
    "image/findImageBanner",
    async () => {
        const response = await customAxios.get("/images/findImageBanner");
        console.log(response.data);
        return response.data;
    }
)