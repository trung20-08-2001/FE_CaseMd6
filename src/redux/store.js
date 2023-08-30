import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import houseSlice from "./slices/houseSlice";
import imageSlice from "./slices/imageSlice";

const store=configureStore({
    reducer:{
        categories:categorySlice,
        house:houseSlice,
        image:imageSlice
    }
})

export default store;