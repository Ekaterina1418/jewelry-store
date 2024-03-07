export interface Product {
  brand: string
  id: string
  price: number
  product: string
}

export interface ProductState {
  products: Product[]
  ids: string[]
  loading: boolean
  error: null | string
  currentPage: number
  totalPages: number
  sortBy: 'ascending' | 'descending' | 'none'
}

export interface FilterState {
  price?: number | null
  brand?: string | null
  productNameFilter: string
}
