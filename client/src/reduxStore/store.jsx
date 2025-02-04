import {configureStore} from "@reduxjs/toolkit"
import {thunk} from 'redux-thunk';

import authReducer from "./slices/auth-slice"
import messageReducer from "./slices/message-slice"
import groupReducer from "./slices/group-slice"
import socketReducer from "./slices/socketInfo"
import callReducer from "./slices/call-slice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        message:messageReducer,
        group:groupReducer,
        socket:socketReducer,
        call:callReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: ['socket/setSocketRef', 'call/setPeer','call/setMyVideoStream','call/setOtherVideoStream', 'call/setIncommingPeerInstance'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['payload'],
            // Ignore these paths in the state
            ignoredPaths: ['socket.socketRef', 'call.peer', 'call.myVideoStream','call.otherVideoStream', 'call.incommingPeerInstance', ],
          },
        }).concat(thunk)
})
