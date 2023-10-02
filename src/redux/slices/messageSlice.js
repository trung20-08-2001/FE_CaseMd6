import { createSlice } from "@reduxjs/toolkit"
import { addAccountYouMessaged, findAccountHostByUsername, findListAccountYouMessaged, findMessageByReceiverAccountAndSenderAccount, saveMessage, send } from "../../services/messageService"


const initialState = {
    listAccountYouMessaged: [],
    messages: [],
    check: false
}

const messagesSlice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {},
    extraReducers: build => {
        build.addCase(saveMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
        })
        build.addCase(saveMessage.pending, (state, action) => {
            // state.messages=[]
        })
        build.addCase(saveMessage.rejected, (state, action) => {
            // state.messages=[]
        });
        build.addCase(findMessageByReceiverAccountAndSenderAccount.fulfilled, (state, action) => {
            state.messages = action.payload
        })
        build.addCase(findMessageByReceiverAccountAndSenderAccount.pending, (state, action) => {
            state.messages = []
        })
        build.addCase(findMessageByReceiverAccountAndSenderAccount.rejected, (state, action) => {
            state.messages = []
        })
        build.addCase(findListAccountYouMessaged.fulfilled, (state, action) => {
            state.listAccountYouMessaged = action.payload
        })
        build.addCase(findListAccountYouMessaged.pending, (state, action) => {
            state.listAccountYouMessaged = []
        })
        build.addCase(findListAccountYouMessaged.rejected, (state, action) => {
            state.listAccountYouMessaged = []
        });
        build.addCase(send.fulfilled, (state, action) => {
            state.messages.push(action.payload)
        })
        build.addCase(addAccountYouMessaged.fulfilled, (state, action) => {
            state.listAccountYouMessaged.push(action.payload)
        })
        build.addCase(findAccountHostByUsername.fulfilled, (state, action) => {
            for (let i = 0; i < action.payload.length; i++) {
                let account = state.listAccountYouMessaged.find(item => item.id === action.payload[i].id)
                if (account === undefined) {
                    state.listAccountYouMessaged.push(action.payload[i])
                }
            }
        })
    }
})

export default messagesSlice.reducer;