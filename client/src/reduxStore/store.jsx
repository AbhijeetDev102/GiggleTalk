import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice"
import messageReducer from "./slices/message-slice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        message:messageReducer
    }
})
