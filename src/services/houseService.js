import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api"

export const saveHouse=createAsyncThunk(
    "houses/saveHouse",
    async(houseDTO)=>{
        return houseDTO;
    }
)

export const editHouse=createAsyncThunk(
    "houses/editHouse",
    async(house)=>{
        return house ;
    }
)


export const findHouseByAccount=createAsyncThunk(
    "houses/myHouses",
    async(idAccount)=>{
        const response=await customAxios.get("/houses/findHouseByAccount/"+idAccount)
        return response.data;
    }
)