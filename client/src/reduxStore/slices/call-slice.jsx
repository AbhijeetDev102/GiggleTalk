import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    peer:null,
    myVideoStream:null,
    otherVideoStream:null,
    remotePeerIdList:null,
    remoteConnectionInstance:null,
    incommingCall:false,
    callMade:false,
    incommingPeerInstance:null,
    callEnd:null,
    callData:null
};
const callReducer = createSlice({
    name: "call",
    initialState,
    reducers: {
        setPeer: (state, action) => {
            state.peer = action.payload;
        },
        setMyVideoStream: (state, action) => {
            state.myVideoStream = action.payload;
        },
        setOtherVideoStream: (state, action) => {
            state.otherVideoStream = action.payload;
        },
        setRemotePeerIdList: (state, action) => {
            state.remotePeerIdList = action.payload;
        },
        setRemoteConnectionInstance: (state, action) => {
            state.remoteConnectionInstance = action.payload;
        },  
        setIncommingCall: (state, action) => {
            state.incommingCall = action.payload;
        },
        setCallMade: (state, action) => {
            state.callMade = action.payload;
        },
        setIncommingPeerInstance: (state, action) => {
            state.incommingPeerInstance = action.payload;
        },
        setCallEnd: (state, action) => {
            state.callEnd = action.payload;
        },
        setCallData: (state, action) => {
            state.callData = action.payload;
        }
    },
    
});

export const { setPeer, setMyVideoStream, setOtherVideoStream , setRemotePeerIdList,setRemoteConnectionInstance, setIncommingCall, setCallMade, setIncommingPeerInstance,setCallEnd,setCallData} = callReducer.actions;

export default callReducer.reducer;