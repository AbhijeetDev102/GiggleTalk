import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    socketId:null,
    groupId:null
}

const socketReducer = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocketId: (state, action) => {
            state.socketId =  action.payload;
        },
        setGroupId: (state, action) => {
            state.groupId =  action.payload;
        }
    },
    
});

export const { setSocketId , setGroupId } = socketReducer.actions;

export default socketReducer.reducer;