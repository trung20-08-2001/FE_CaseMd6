import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const saveHouse = createAsyncThunk(
    "houses/saveHouse",
    async (houseDTO) => {
        return houseDTO;
    }
)

export const editHouse = createAsyncThunk(
    "houses/editHouse",
    async (house) => {
        return house;
    }
)


export const findHouseByAccount = createAsyncThunk(
    "houses/myHouses",
    async (idAccount) => {
        const response = await customAxios.get("/houses/findHouseByAccount/" + idAccount)
        return response.data;
    }
)


export const findTopHouse = createAsyncThunk(
    "houses/findTopHouse",
   async()=>{
    const response=await customAxios.get("houses/findTopHouse");
    return response.data;
   }
)

export const findAllHouse=createAsyncThunk(
    "houses/findAllHouse",
    async({page,size})=>{
        const response=await customAxios.get("houses/findAllHouse?page="+page+"&size="+size)
        return response.data;
    }
)

export const findHouseTopSearch=createAsyncThunk(
    "houses/findHouseTopSearch",
    async()=>{
        const response=await customAxios.get("houses/findTopSearch");
        return response.data;
    }
)

export const saveHouseToServer=(house)=> customAxios.post("/houses/save",house)


export const changePageCurrent=createAsyncThunk(
    "houses/changePageCurrent",
    async(page)=>{
        return page
    }
)

export const resetData=createAsyncThunk(
    "houses/resetData",
    async()=>{
        return []
    }
)

export const findHousePageSearch=createAsyncThunk(
    "houses/findHousePageSearch",
    async()=>{
        const response=await customAxios.get("houses/findHousePageSearch")
        return response.data
    }
)