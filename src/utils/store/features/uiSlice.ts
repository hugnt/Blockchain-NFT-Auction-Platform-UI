import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UIState{
    navHeight: number;
    isNotFound: boolean;
    loading: boolean;
}
const initialState: UIState = {
    navHeight:0,
    isNotFound: false,
    loading: false
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers:{
        handleChangeUI: (state, action: PayloadAction<{ navHeight: number }>) => {
            state.navHeight = action.payload.navHeight;
        },
        handle404: (state, action: PayloadAction<{ isNotFound: boolean }>) => {
            state.isNotFound = action.payload.isNotFound;
        },
        handleLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
            state.loading = action.payload.loading;
        },
    }
})
export default uiSlice.reducer;
export const {handleChangeUI, handle404, handleLoading} = uiSlice.actions;