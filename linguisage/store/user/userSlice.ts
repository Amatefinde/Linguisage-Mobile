import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IUser from "../../types/IUser";


interface UserState {
    last_book_id: number | null,
    userData: IUser | null,
}


const initialState: UserState = {
    last_book_id: null,
    userData: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {state.userData = action.payload},
        logOut: (state) => {state.userData = null},
    },
})

export const {setUser, logOut} = userSlice.actions;
export default userSlice.reducer;