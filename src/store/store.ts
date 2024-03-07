import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./products/products.slice";
import filtersReducer from "./filter/filters.slice";


export const rootReducer = combineReducers({
    products: productReducer,
    filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
