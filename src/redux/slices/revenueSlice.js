import { createSlice } from "@reduxjs/toolkit"
import { findRevenueOfHost } from "../../services/revenueService"

const initState={
    revenue:[]
}

const revenueSlice=createSlice({
    name:"revenue",
    initialState: initState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(findRevenueOfHost.fulfilled,(state,action)=>{
            state.revenue=action.payload;
        })
        build.addCase(findRevenueOfHost.pending,(state,action)=>{
            state.revenue=[]
        })
        build.addCase(findRevenueOfHost.rejected,(state,action)=>{
            state.revenue=[]
        })
    }
})

export default revenueSlice.reducer;