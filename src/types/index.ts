export interface Product {
    brand: string;
    id: string;
    price: number;
    product: string;
   
}

export interface ProductState {
    products: Product[];
    ids: string[];
    loading: boolean;
    error: null | string;
    currentPage: number;
    totalPages: number;
}


