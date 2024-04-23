import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSense, IUserSenses } from "../../types/UserSensesInterface";

const initialState: { pickedSense: IUserSense | null } = {
    pickedSense: null,
};

const pickedSenseSlice = createSlice({
    name: "userSense",
    initialState,
    reducers: {
        setPickedSense: (state, action: PayloadAction<IUserSense>) => {
            state.pickedSense = action.payload;
        },
    },
});

export const { setPickedSense } = pickedSenseSlice.actions;
export default pickedSenseSlice.reducer;
