import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import houseSlice from "./slices/houseSlice";
import imageSlice from "./slices/imageSlice";
import accountSlice from "./slices/accountSlice";
import revenueSlice from "./slices/revenueSlice";
import billSlice from "./slices/billSlice";
import messageSlice from "./slices/messageSlice";

const store=configureStore({
    reducer:{
        categories:categorySlice,
        house:houseSlice,
        image:imageSlice,
        account:accountSlice,
        revenue:revenueSlice,
        bill:billSlice,
        message:messageSlice
    }
})

export default store;