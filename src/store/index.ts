import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./store";




export const store = configureStore({
    reducer: rootReducer,
   
});



export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

