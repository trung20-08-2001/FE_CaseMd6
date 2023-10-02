import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import houseSlice from "./slices/houseSlice";
import accountSlice from "./slices/accountSlice";
import revenueSlice from "./slices/revenueSlice";
import billSlice from "./slices/billSlice";
import messageSlice from "./slices/messageSlice";
import notifiactionSlice from "./slices/notifiactionSlice";

const store=configureStore({
    reducer:{
        categories:categorySlice,
        house:houseSlice,
        account:accountSlice,
        revenue:revenueSlice,
        bill:billSlice,
        message:messageSlice,
        notification:notifiactionSlice
    }
})

export default store;