import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Lucid } from "lucid-cardano";
import { Account } from "~/utils/interface";

interface LucidState{
    lucid: Lucid;
}
const initialState: LucidState = {
    lucid:null!
}

export const lucidSlice = createSlice({
    name: "lucid",
    initialState,
    reducers:{
        handleChangeLucid: (state, action: PayloadAction<{ lucid: Lucid }>) => {
            state.lucid = action.payload.lucid;
        },
    }
})
export default lucidSlice.reducer;
export const {handleChangeLucid} = lucidSlice.actions;