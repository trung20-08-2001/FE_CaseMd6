import { findListAccountUsers, login,changeStatusAccount, findAccountAdmin, findAccountsHost, findAccountsUserMessageToAccountHost, findAccountById } from "../../services/accountService"
import { createSlice } from "@reduxjs/toolkit"

const initState={
    account:JSON.parse(localStorage.getItem("account")),
    listAccountUser:[],
    listAccountsHost:[],
    accountAdmin:{},
    accountReceiverCurrent:{}
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
        build.addCase(findAccountAdmin.fulfilled,(state,action)=>{
            state.accountAdmin=action.payload;
        })
        build.addCase(findAccountAdmin.pending,(state,action)=>{
            state.accountAdmin={}
        })
        build.addCase(findAccountAdmin.rejected,(state,action)=>{
            state.accountAdmin={}
        })
        build.addCase(findAccountsHost.fulfilled,(state,action)=>{
            state.listAccountsHost=action.payload
        })
        build.addCase(findAccountsHost.pending,(state,action)=>{
            state.listAccountsHost=[]
        })
        build.addCase(findAccountsHost.rejected,(state,action)=>{
            state.listAccountsHost=[]
        })
        build.addCase(findAccountsUserMessageToAccountHost.fulfilled,(state,action)=>{
            state.listAccountsUserMessageToAccountHost=action.payload;
        })
        build.addCase(findAccountsUserMessageToAccountHost.pending,(state,action)=>{
            state.listAccountsUserMessageToAccountHost=[]
        });
        build.addCase(findAccountsUserMessageToAccountHost.rejected,(state,action)=>{
            state.listAccountsUserMessageToAccountHost=[]
        })
        build.addCase(findAccountById.fulfilled,(state,action)=>{
            state.accountReceiverCurrent=action.payload;
        })
        build.addCase(findAccountById.pending,(state,action)=>{
            state.accountReceiverCurrent={}
        });
        build.addCase(findAccountById.rejected,(state,action)=>{
            state.accountReceiverCurrent={}
        })
    }
})

export default accountSlice.reducer;