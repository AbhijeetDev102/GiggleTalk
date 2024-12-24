import { createSlice } from "@reduxjs/toolkit";


const messageReducer = createSlice({
    name:"messageState",
    initialState:{
        messageValue:null
    },

    reducers:{
        SetMessage:(state, action)=>{
            state.messageValue= action.payload
        }
    }
})

export const {SetMessage} = messageReducer.actions
export default messageReducer.reducer
