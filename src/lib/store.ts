"use client";
import { combineReducers } from '@reduxjs/toolkit'
import productReducer from '../lib/features/products/products.slice'
import filtersReducer from '../lib/features/filter/filters.slice'

export const rootReducer = combineReducers({
  products: productReducer,
  filters: filtersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
