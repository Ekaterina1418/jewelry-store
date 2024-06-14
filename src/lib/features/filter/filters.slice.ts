
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "../../../types";

const initialState: FilterState = {
    price: null,
    brand: "",
    productNameFilter: "",
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setPriceFilter: (state, action: PayloadAction<number | null>) => {
            state.price = action.payload;
        },
        setBrandFilter: (state, action: PayloadAction<string | null>) => {
            state.brand = action.payload;
        },
        setProductNameFilter: (state, action: PayloadAction<string>) => {
            state.productNameFilter = action.payload;
        },
    },
});

export const { setPriceFilter, setBrandFilter, setProductNameFilter } =
    filtersSlice.actions;
export default filtersSlice.reducer;
