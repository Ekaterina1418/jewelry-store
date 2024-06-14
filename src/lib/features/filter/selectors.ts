
import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { ITEMS_PER_PAGE } from "../../../utils/constants";
export const selectProducts = (state: RootState) => state.products.products;
export const selectBrandFilter = (state: RootState) => state.filters.brand;
export const selectPriceFilter = (state: RootState) => state.filters.price;
export const selectSortBy = (state: RootState) => state.products.sortBy;
export const selectNameFilter = (state: RootState) =>
    state.filters.productNameFilter;
export const selectCurrentPage = (state: RootState) =>
    state.products.currentPage;
export const selectTotalPages = (state: RootState) => state.products.totalPages;

export const selectFilteredProducts = createSelector(
    [
        selectProducts,
        selectBrandFilter,
        selectPriceFilter,
        selectSortBy,
        selectNameFilter,
        selectCurrentPage,
        selectTotalPages,
    ],
    (products, brandFilter, priceFilter, sortBy, nameFilter, currentPage) => {
        let filteredProducts = products;

        if (brandFilter) {
            filteredProducts = filteredProducts.filter(
                (product) => product.brand === brandFilter
            );
        }

        if (priceFilter) {
            filteredProducts = filteredProducts.filter(
                (product) => product.price === priceFilter
            );
        }

        if (nameFilter) {
            filteredProducts = filteredProducts
                .slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    currentPage * ITEMS_PER_PAGE
                )
                .filter((product) =>
                    product.title
                        .toLowerCase()
                        .includes(nameFilter.toLowerCase())
                );
        }

        if (sortBy === "ascending") {
            filteredProducts = filteredProducts
                .slice()
                .sort((a, b) => a.price - b.price);
        } else if (sortBy === "descending") {
            filteredProducts = filteredProducts
                .slice()
                .sort((a, b) => b.price - a.price);
        }

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

         return filteredProducts.slice(startIndex, endIndex);
    }
);
