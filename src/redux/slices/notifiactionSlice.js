import { createSlice } from "@reduxjs/toolkit"
import { addNotification, findNotificationByIdAccount, updateStatus } from "../../services/notificationService"

const initialState={
    notifications:[]
}


const notificationSlice=createSlice({
    name:"notifications",
    initialState:initialState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(addNotification.fulfilled,(state,action)=>{
            state.notifications.unshift(action.payload)
        })
        build.addCase(findNotificationByIdAccount.fulfilled,(state,action)=>{
            state.notifications=action.payload
        })
        build.addCase(findNotificationByIdAccount.pending,(state,action)=>{
            state.notifications=[]
        })
        build.addCase(findNotificationByIdAccount.rejected,(state,action)=>{
            state.notifications=[]
        })
        build.addCase(updateStatus.fulfilled,(state,action)=>{
            state.notifications=action.payload
        })
        build.addCase(updateStatus.pending,(state,action)=>{
            state.notifications=[]
        })
        build.addCase(updateStatus.rejected,(state,action)=>{
            state.notifications=[]
        })
       
    }
})

export default notificationSlice.reducer;