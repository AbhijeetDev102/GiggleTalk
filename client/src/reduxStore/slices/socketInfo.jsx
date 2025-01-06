import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    socketRef:null,
    groupId:null
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
        }
    },
    
});

export const { setSocketRef , setGroupId } = socketReducer.actions;

export default socketReducer.reducer;