import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    socketRef:null,
    groupId:null,
    peer:null,
}

const socketReducer = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocketRef: (state, action) => {
            state.socketRef =  action.payload;
        },
        setGroupId: (state, action) => {
            state.groupId =  action.payload;
        },
        setPeer: (state, action) => {
            state.peer = action.payload;
        }
    },
    
});

export const { setSocketRef , setGroupId, setPeer } = socketReducer.actions;

export default socketReducer.reducer;