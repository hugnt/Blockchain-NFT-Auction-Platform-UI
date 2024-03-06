import { configureStore } from "@reduxjs/toolkit";
import {accountSlice} from "./features/accountSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {lucidSlice} from "./features/lucidSlice";
import { uiSlice } from "./features/uiSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
export const store = configureStore({
    reducer:{
        account: accountSlice.reducer,
        lucid: lucidSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;