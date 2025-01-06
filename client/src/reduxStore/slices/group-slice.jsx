import { createSlice } from "@reduxjs/toolkit";




const groupReducer = createSlice({
    name: "group",
    initialState: {
        groupinfo: null,
        groupIds:null
    },

    reducers: {
        setGroupinfo: (state, action) => {
            state.groupinfo =  action.payload;
        },
        setGroupIds: (state, action) => {
            state.groupIds =  action.payload;
        },
    },
    
});

export const { setGroupinfo , setGroupIds} = groupReducer.actions;

export default groupReducer.reducer;