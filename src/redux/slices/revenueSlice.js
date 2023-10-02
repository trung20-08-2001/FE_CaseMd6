import { createSlice } from "@reduxjs/toolkit"
import { findRevenueOfHost } from "../../services/revenueService"

const initState = {
    data: [],
    loading: true
}

const revenueSlice = createSlice({
    name: "revenue",
    initialState: initState,
    reducers: {},
    extraReducers: build => {
        build.addCase(findRevenueOfHost.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        build.addCase(findRevenueOfHost.pending, (state, action) => {
            state.revenue = [];
            state.revenue.loading = true;
        })
        build.addCase(findRevenueOfHost.rejected, (state, action) => {
            state.revenue = []
        })
    }
})

export default revenueSlice.reducer;