import { createSlice } from "@reduxjs/toolkit"
import {findImageBanner} from "../../services/imageService"
const initState={
    imageBanner:[]
}

const imageSlice=createSlice({
    name:'image',
    initialState:initState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(findImageBanner.fulfilled,(state,action)=>{
            state.imageBanner=action.payload
        })
        
    }
})

export default imageSlice.reducer;