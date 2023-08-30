import { createSlice } from "@reduxjs/toolkit"
import { saveHouse } from "../../services/houseService"



const initState={
    house:{}
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
            console.log(action.payload)
            state.house={}
        })
        build.addCase(saveHouse.pending, (state,action)=>{
            state.house={}
        })
    }
})

export default houseSlice.reducer;