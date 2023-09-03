import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import houseSlice from "./slices/houseSlice";
import imageSlice from "./slices/imageSlice";
import accountSlice from "./slices/accountSlice";

const store=configureStore({
    reducer:{
        categories:categorySlice,
        house:houseSlice,
        image:imageSlice,
        account:accountSlice
    }
})

export default store;