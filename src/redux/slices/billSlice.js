import { createSlice } from "@reduxjs/toolkit"
import { addBillHistoryHost, addBillHistoryUser, filterDateCheckin, filterDateCheckout, filterNameHouse, filterStatus, updateBillsHost } from "../../services/billService"
import {hasNotifiaction,seenNotification} from "../../services/notificationService"
const initialState = {
    billHistoryHost: [],
    billHistoryUser:[],
    nameHouseSearch:"",
    dateCheckin:"1990-1-1",
    dateCheckout:"2999-12-31",
    status:"ALL",
    hasNotifiaction:false
}

const billSlice = createSlice({
    name: "bill",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBillHistoryHost.fulfilled, (state, action) => {
            state.billHistoryHost = action.payload
        })
        builder.addCase(addBillHistoryHost.pending, (state, action) => {
            state.billHistoryHost = []
        })
        builder.addCase(addBillHistoryHost.rejected, (state, action) => {
            state.billHistoryHost = []
        })
        builder.addCase(addBillHistoryUser.fulfilled, (state, action) => {
            state.billHistoryUser = action.payload
        })
        builder.addCase(addBillHistoryUser.pending, (state, action) => {
            state.billHistoryUser = []
        })
        builder.addCase(addBillHistoryUser.rejected, (state, action) => {
            state.billHistoryUser = []
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
        builder.addCase(hasNotifiaction.fulfilled,(state,action)=>{
            state.hasNotifiaction=action.payload
        })
        builder.addCase(seenNotification.fulfilled,(state,action)=>{
            state.hasNotifiaction=action.payload
        })
    }
})


export default billSlice.reducer;