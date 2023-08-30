import { createSlice } from "@reduxjs/toolkit"
import { getAllCategory } from "../../services/categoryService"

const initialState = {
    categories: []
}

const categorySlice=createSlice({
    name: "categorise",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled,(state,action)=>{
            state.categories=action.payload
        })
        builder.addCase(getAllCategory.pending,(state,action)=>{
            state.categories=[]
        })
        builder.addCase(getAllCategory.rejected,(state,action)=>{
            state.categories=[]
        })
       
    }
})

export default categorySlice.reducer; 