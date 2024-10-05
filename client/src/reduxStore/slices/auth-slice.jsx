import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name:"auth",
    initialState:{
        userinfo:null
    },

    reducers:{
        setUserinfo:(state, action)=>{
            state.userinfo= action.payload
        }
    }
})


export const {setUserinfo} = authReducer.actions
export default authReducer.reducer