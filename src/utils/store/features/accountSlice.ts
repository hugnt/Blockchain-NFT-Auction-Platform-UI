import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Account } from "~/utils/interface";

interface ReduxState{
    account: Account;
}
const initialState: ReduxState = {
    account: {
        id: 0,
        address: "",
        avatar: "",
        cover: "",
        description: "",
        email: "",
        facebook: "",
        followers: 0,
        following: 0,
        name: "",
        telegram: "",
        twitter: "",
        walletAddress: "",
        youtube: ""
      }
}

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers:{
        handleChangeAccount: (state, action: PayloadAction<{ account: Account }>) => {
            state.account = action.payload.account;
        },
    }
})
export default accountSlice.reducer;
export const {handleChangeAccount} = accountSlice.actions;