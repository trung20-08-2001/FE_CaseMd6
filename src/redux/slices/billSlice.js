import { createSlice } from "@reduxjs/toolkit"
import { findBillHistoryHost, updateBillsHost } from "../../services/billService"

const initialState = {
    billHistoryHost: []
}

const billSlice = createSlice({
    name: "bill",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(findBillHistoryHost.fulfilled, (state, action) => {
            state.billHistoryHost = action.payload
        })
        builder.addCase(findBillHistoryHost.pending, (state, action) => {
            state.billHistoryHost = []
        })
        builder.addCase(findBillHistoryHost.rejected, (state, action) => {
            state.billHistoryHost = []
        })
        builder.addCase(updateBillsHost.fulfilled, (state, action) => {
            state.billHistoryHost = action.payload
        })
        builder.addCase(updateBillsHost.pending, (state, action) => {
            state.billHistoryHost = []
        });
        builder.addCase(updateBillsHost.rejected, (state, action) => {
            state.billHistoryHost = []
        })
    }
})


export default billSlice.reducer;