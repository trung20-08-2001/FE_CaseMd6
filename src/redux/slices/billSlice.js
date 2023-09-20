import { createSlice } from "@reduxjs/toolkit"
import { addBillHistory, filterDateCheckin, filterDateCheckout, filterNameHouse, filterStatus, updateBillsHost } from "../../services/billService"

const initialState = {
    billHistoryHost: [],
    nameHouseSearch:"",
    dateCheckin:"1990-1-1",
    dateCheckout:"2999-12-31",
    status:"ALL"
}

const billSlice = createSlice({
    name: "bill",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBillHistory.fulfilled, (state, action) => {
            state.billHistoryHost = action.payload
        })
        builder.addCase(addBillHistory.pending, (state, action) => {
            state.billHistoryHost = []
        })
        builder.addCase(addBillHistory.rejected, (state, action) => {
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
        builder.addCase(filterNameHouse.fulfilled, (state, action) => {
            state.nameHouseSearch=action.payload
        })   
        builder.addCase(filterDateCheckin.fulfilled, (state, action) => {
            state.dateCheckin=action.payload
        })
        builder.addCase(filterDateCheckout.fulfilled, (state, action) => {
            state.dateCheckout=action.payload
        })
        builder.addCase(filterStatus.fulfilled, (state, action) => {
            state.status=action.payload;
        })
    }
})


export default billSlice.reducer;