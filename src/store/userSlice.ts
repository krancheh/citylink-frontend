import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

type User = {
    id: string;
    name: string;
}


const slice = createSlice({
    name: "user",
    initialState: {
        user: {id: "21313", name: "Кирилл"} as User,
        isLoading: false,

    },
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
})

export const selectUser = (state: RootState) => {
    return state.user.user;
}

export const {
    setUser,
    setIsLoading,
} = slice.actions;

export default slice.reducer;