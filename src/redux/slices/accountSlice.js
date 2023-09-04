import { login } from "../../services/accountService"
import { createSlice } from "@reduxjs/toolkit"

const initState={
    account:JSON.parse(localStorage.getItem("account"))
}

const accountSlice=createSlice({
    name:"account",
    initialState:initState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(login.fulfilled, (state,action)=>{
            state.account=action.payload
        })
    }
})

export default accountSlice.reducer;