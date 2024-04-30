import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import userSenseReducer from "./userSenses/userSensesSlice";
import pickedSenseReducer from "./pickedSense/pickedSenseSlice";
import trainingSettings from "./trainingSettings/trainingSettings";

export const store = configureStore({
    reducer: {
        user: userReducer,
        userSense: userSenseReducer,
        pickedSense: pickedSenseReducer,
        trainingSettings: trainingSettings,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
