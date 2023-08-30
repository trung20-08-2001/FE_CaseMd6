import { createAsyncThunk } from "@reduxjs/toolkit"
import customAxios from "./api"

export const getAllCategory = createAsyncThunk(
    "categorise/getAllCategory",
    async() => {
        const response = await customAxios.get("/categories/findAll")
        return response.data;
    }
)