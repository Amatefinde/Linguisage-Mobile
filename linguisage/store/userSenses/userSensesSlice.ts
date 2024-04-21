import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserSenses} from "../../types/UserSensesInterface";



const initialState: IUserSenses = {
    senses: []
}

const userSensesSlice = createSlice({
    name: "userSenses",
    initialState,
    reducers: {
        setUserSenses: (state, action: PayloadAction<IUserSenses>) => {state.senses = action.payload.senses},
        removeUserSense: (state, action: PayloadAction<number>) => {
            state.senses = state.senses.filter((sense) => sense.id !== action.payload);
        },
    },
})

export const {setUserSenses, removeUserSense} = userSensesSlice.actions;
export default userSensesSlice.reducer;