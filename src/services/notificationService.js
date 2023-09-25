import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const saveNotification=(notification)=> customAxios.post("/notifications/save", notification)

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


export const addNotification=createAsyncThunk(
   "notifications/addNotification",
   async(notification)=>{
      return notification
   }
)

export const hasNotifiaction=createAsyncThunk(
   "notifications/hasNotifiaction",
   async()=>{
      return true
   }
)

export const seenNotification=createAsyncThunk(
   "notifications/seenNotification",
   async()=>{
      return false
   }
)