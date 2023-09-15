import { createSlice } from "@reduxjs/toolkit"
import { addMessage, addNotification, findMessageByReceiverAccountAndSenderAccount, receiveMessage } from "../../services/messageService"

const initialState={
    messages:{},
    notification:{},    
}

const messagesSlice=createSlice({
    name:"messages",
    initialState:initialState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(addMessage.fulfilled,(state,action)=>{
            state.messages=action.payload
        })
        build.addCase(addMessage.pending,(state,action)=>{
            state.messages=[]
        })
        build.addCase(addMessage.rejected,(state,action)=>{
            state.messages=[]
        });
        build.addCase(addNotification.fulfilled,(state,action)=>{
            state.notification=action.payload;
        })
        
    }
})

export default messagesSlice.reducer;