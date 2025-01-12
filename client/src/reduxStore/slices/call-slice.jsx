import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    peer:null,
    myVideoRef:null,
    otherVideoRef:null,
    remotePeerIdList:null,
    incommingCall:false,
    callMade:false
}

const callReducer = createSlice({
    name: "call",
    initialState,
    reducers: {
        setPeer: (state, action) => {
            state.peer = action.payload;
        },
        setMyVideoRef: (state, action) => {
            state.myVideoRef = action.payload;
        },
        setOtherVideoRef: (state, action) => {
            state.otherVideoRef = action.payload;
        },
        setRemotePeerIdList: (state, action) => {
            state.remotePeerIdList = action.payload;
        },
        setIncommingCall: (state, action) => {
            state.incommingCall = action.payload;
        },
        setCallMade: (state, action) => {
            state.callMade = action.payload;
        },
    },
    
});

export const { setPeer, setMyVideoRef, setOtherVideoRef , setRemotePeerIdList, setIncommingCall, setCallMade} = callReducer.actions;

export default callReducer.reducer;