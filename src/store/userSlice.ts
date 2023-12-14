import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";


const slice = createSlice({
    name: "user",
    initialState: {
        name: "",
        isLoading: false,
        boughtSuccess: false,
    },
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setBoughtSuccess: (state, action: PayloadAction<boolean>) => {
            state.boughtSuccess = action.payload;
        }
    },
})

export const selectUser = (state: RootState) => {
    return state.user.name;
}

export const selectIsLoading = (state: RootState) => {
    return state.user.isLoading;
}

export const {
    setUser,
    setIsLoading,
    setBoughtSuccess
} = slice.actions;

export default slice.reducer;