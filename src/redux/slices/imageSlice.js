import { createSlice } from "@reduxjs/toolkit"
import { saveImage, saveImageURL } from "../../services/imageService"
const initState={
    imageURL:'https://afdevinfo.com/wp-content/uploads/2017/10/thiet-ke-hinh-ngoi-nha-dep.jpg',
    image:{}
}

const imageSlice=createSlice({
    name:'image',
    initialState:initState,
    reducers:{},
    extraReducers:build=>{
        build.addCase(saveImage.fulfilled,(state,action)=>{
            state.image=action.payload
        })
        build.addCase(saveImage.rejected,(state,action)=>{
            state.image={}
        })
        build.addCase(saveImage.pending,(state,action)=>{
            state.image={}
        })
        build.addCase(saveImageURL.fulfilled,(state,action)=>{
            state.imageURL=action.payload
        })
        build.addCase(saveImageURL.rejected,(state,action)=>{
            state.imageURL=''
        })
        build.addCase(saveImageURL.pending,(state,action)=>{
            state.imageURL=''
        })
    }
})

export default imageSlice.reducer;