import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../../types";
import { url } from "../../../api/requestBody";
import { ITEMS_PER_PAGE } from "../../../utils/constants";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  sortBy: "none",
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${url}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.products;
    } catch (error) {
      console.error("API request failed:", error);
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 500) {
        console.log("Retrying request...");
      }

      return rejectWithValue(
        (error as Error).message || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ProductState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;

        state.totalPages = Math.ceil(state.products.length / ITEMS_PER_PAGE);
      }
    );

    builder.addCase(
      fetchProducts.rejected,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
export const { setCurrentPage, setSortBy, setSelectedProduct } =
  productSlice.actions;
