import { createSlice } from "@reduxjs/toolkit"
import { saveHouse,findHouseByAccount } from "../../services/houseService"

const initState={
    house:{},
    myHouses:[]
}



const houseSlice=createSlice({
    name:"houses",
    initialState:initState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(saveHouse.fulfilled, (state,action)=>{
            state.house=action.payload
        })
        build.addCase(saveHouse.rejected, (state,action)=>{
            state.house={}
        })
        build.addCase(saveHouse.pending, (state,action)=>{
            state.house={}
        })
        build.addCase(findHouseByAccount.fulfilled, (state,action)=>{
            state.myHouses=action.payload;
        })
        build.addCase(findHouseByAccount.rejected, (state,action)=>{
            state.myHouses=[]
        })
        build.addCase(findHouseByAccount.pending, (state,action)=>{
            state.myHouses=[]
        })
    }
})

export default houseSlice.reducer;