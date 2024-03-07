import axios, { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import xAuth from '../../api/requestBody'
import { RootState } from '../store'
import { Product, ProductState } from '../../types'
import { url } from '../../api/requestBody'
import { ITEMS_PER_PAGE } from '../../utils/constants'

const initialState: ProductState = {
  products: [],
  ids: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  sortBy: 'none',
}

export const fetchIdProducts = createAsyncThunk(
  'id/fetchId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}`,
        {
          action: 'get_ids',
          params: { offset: 0, limit: 100 },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': xAuth,
          },
        }
      )
      return response.data.result
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
          console.error('Error response:', axiosError.response.data)
        } else if (axiosError.request) {
          console.error('No response received:', axiosError.request)
        }
        return rejectWithValue(axiosError.response?.data)
      } else {
        console.error('Unexpected error:', (error as Error).message)
        return rejectWithValue('Unexpected error')
      }
    }
  }
)

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { ids } = (getState() as RootState).products

      const response = await axios.post(
        `${url}`,
        {
          action: 'get_items',
          params: { ids },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': xAuth,
          },
        }
      )

      return response.data.result
    } catch (error) {
      console.error('API request failed:', error)
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 500) {
        console.log('Retrying request...')
      }

      return rejectWithValue(
        (error as Error).message || 'Failed to fetch products'
      )
    }
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSortBy: (state, action: PayloadAction<ProductState['sortBy']>) => {
      state.sortBy = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIdProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchIdProducts.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.loading = false
        state.ids = action.payload
        state.error = null
      }
    )
    builder.addCase(
      fetchIdProducts.rejected,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.ids = []
        state.error = action.payload
      }
    )
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
        state.error = null
        const uniqueProductIds = new Set<string | number>()

        state.products = state.products.filter((product) => {
          const itemId = product.id
          if (itemId !== null) {
            const isUnique = !uniqueProductIds.has(itemId)
            uniqueProductIds.add(itemId)
            return isUnique
          }
          return false
        })

        state.totalPages = Math.ceil(state.products.length / ITEMS_PER_PAGE)
      }
    )

    builder.addCase(
      fetchProducts.rejected,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.products = []
        state.error = action.payload
      }
    )
  },
})

export default productSlice.reducer
export const { setCurrentPage, setSortBy } = productSlice.actions
