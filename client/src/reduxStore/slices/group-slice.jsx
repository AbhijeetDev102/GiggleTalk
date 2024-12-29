import { createSlice } from "@reduxjs/toolkit";




const groupReducer = createSlice({
    name: "group",
    initialState: {
        groupinfo: null
    },

    reducers: {
        setGroupinfo: (state, action) => {
            state.groupinfo =  action.payload;
        }
    },
    
});

export const { setGroupinfo } = groupReducer.actions;

export default groupReducer.reducer;