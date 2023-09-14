import { createSlice } from "@reduxjs/toolkit"
import { findMessageByReceiverAccountAndSenderAccount, receiveMessage } from "../../services/messageService"

const initialState={
    messages:[],
    
}

const messagesSlice=createSlice({
    name:"messages",
    initialState:initialState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(findMessageByReceiverAccountAndSenderAccount.fulfilled,(state,action)=>{
            state.messages=action.payload
        })
        build.addCase(findMessageByReceiverAccountAndSenderAccount.pending,(state,action)=>{
            state.messages=[]
        })
        build.addCase(findMessageByReceiverAccountAndSenderAccount.rejected,(state,action)=>{
            state.messages=[]
        });
        
    }
})

export default messagesSlice.reducer;