import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice"
import messageReducer from "./slices/message-slice"
import groupReducer from "./slices/group-slice"
import socketReducer from "./slices/socketInfo"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        message:messageReducer,
        group:groupReducer,
        socket:socketReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types
            ignoredActions: ['socket/setSocketRef'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['payload'],
            // Ignore these paths in the state
            ignoredPaths: ['socket.socketRef'],
          },
        }),
})
