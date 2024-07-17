export interface Product {
  title: string;
  id: number;
  brand: string
  price: number;
  category: string;
  images: string[];
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: null | string;
  currentPage: number;
  totalPages: number;
  sortBy: "ascending" | "descending" | "none";
  selectedProduct: Product | null;
}

export interface FilterState {
  price?: number | null;
  brand?: string | null;
  productNameFilter: string;
}
