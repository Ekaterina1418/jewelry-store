import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";

export const rootReducer = combineReducers({
    products:productReducer
});

export type RootState = ReturnType<typeof rootReducer>;
