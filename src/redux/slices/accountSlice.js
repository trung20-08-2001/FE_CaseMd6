import { findListAccountUsers, login } from "../../services/accountService"
import { createSlice } from "@reduxjs/toolkit"

const initState={
    account:JSON.parse(localStorage.getItem("account")),
    listAccountUser:[],
}

const accountSlice=createSlice({
    name:"account",
    initialState:initState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(login.fulfilled, (state,action)=>{
            state.account=action.payload
        })
        build.addCase(findListAccountUsers.fulfilled, (state,action)=>{
            state.listAccountUser=action.payload;
        })
        build.addCase(findListAccountUsers.rejected, (state,action)=>{
            state.listAccountUser=[]
        })
        build.addCase(findListAccountUsers.pending, (state,action)=>{
            state.listAccountUser=[]
        })
    }
})

export default accountSlice.reducer;