import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const saveNotification = createAsyncThunk(
   "notifications/saveNotification",
   async (notification) => {
      const response =await customAxios.post("/notifications/save", notification)
      return response.data
   }
);

export const findNotificationByIdAccount=createAsyncThunk(
   "notifications/findByIdAccount",
   async(idAccount)=>{
      const response = await customAxios.get("/notifications/findByIdAccount/"+idAccount )
      return response.data;
   }
)


export const updateStatus=createAsyncThunk(
   "notifications/updateStatus",
   async(notifications)=>{
      const response=await customAxios.post("/notifications/updateStatus", notifications)
      return response.data;
   }
)