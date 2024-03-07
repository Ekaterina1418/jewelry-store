import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.products.products;
export const selectBrandFilter = (state: RootState) => state.filters.brand;
export const selectPriceFilter = (state: RootState) => state.filters.price;
export const selectSortBy = (state: RootState) => state.products.sortBy;
export const selectNameFilter = (state: RootState) => state.filters.productNameFilter;

export const selectFilteredProducts = createSelector(
    [
        selectProducts,
        selectBrandFilter,
        selectPriceFilter,
        selectSortBy,
        selectNameFilter,
    ],
    (products, brandFilter, priceFilter, sortBy, nameFilter) => {
        let filteredProducts = products.filter((product) => {
            const brandCondition = brandFilter
                ? product.brand === brandFilter
                : true;

            const priceCondition = priceFilter
                ? product.price === priceFilter
                : true;
            const nameCondition =  product.product.toLowerCase().includes(nameFilter.toLowerCase())
              
            return brandCondition && priceCondition && nameCondition
        });

        if (sortBy === "ascending") {
            filteredProducts = filteredProducts
                .slice()
                .sort((a, b) => a.price - b.price);
        } else if (sortBy === "descending") {
            filteredProducts = filteredProducts
                .slice()
                .sort((a, b) => b.price - a.price);
        }

        return filteredProducts;
    }
);
