import { findListAccountUsers, login,changeStatusAccount } from "../../services/accountService"
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
        build.addCase(changeStatusAccount.fulfilled, (state,action)=>{
            let newListAccountUser=[...state.listAccountUser];
            for(let i=0; i<newListAccountUser.length;i++){
                if(newListAccountUser[i].id==action.payload.id){
                    newListAccountUser[i]=action.payload;
                    break;
                }
            }
            state.listAccountUser=newListAccountUser;
        })
    }
})

export default accountSlice.reducer;