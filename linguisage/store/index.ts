import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import userSenseReducer from "./userSenses/userSensesSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        userSense: userSenseReducer,
    },
}, )

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;