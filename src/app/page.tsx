"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { Product } from "@/types";
import { fetchProducts } from "../lib/features/products/products.slice";
import "../app/globals.css";
import { RootState } from "../lib/index";
import { AppDispatch } from "../lib/index";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { CardProduct } from "../components/card/card-product";
import { Loader } from "../components/loader/loader";
import { Error } from "../components/404/404";
import {
  setCurrentPage,
  setSortBy,
} from "../lib/features/products/products.slice";
import { selectFilteredProducts } from "../lib/features/filter/selectors";
import {
  setBrandFilter,
  setPriceFilter,
  setProductNameFilter,
} from "../lib/features/filter/filters.slice";
import { FilterProducts } from "../components/filter/filter-products";
import { useSelector } from "react-redux";
import { Modal } from "@/components/Modal/product-modal";

function PageMain() {
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { products, currentPage, totalPages, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const productNameFilter = useAppSelector(
    (state: RootState) => state.filters.productNameFilter
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const [dataLoaded, setDataLoaded] = useState(false);
  const [newPrice, setNewPrice] = useState<number | null>(null);
  const [newBrand, setNewBrand] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const brands = Array.from(new Set(products.map((item) => item.brand)));

  const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setProductNameFilter(value));
    if (value === "") {
      dispatch(setBrandFilter(null));
      dispatch(setSortBy("none"));
      dispatch(setPriceFilter(null));
    }
  };

  const handleBrandFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setNewBrand(value);
    if (value === "") {
      dispatch(setBrandFilter(null));
    } else {
      dispatch(setBrandFilter(value));
    }
  };

  const handleSortByLowestPrice = () => {
    dispatch(setSortBy("ascending"));
  };

  const handleSortByHighestPrice = () => {
    dispatch(setSortBy("descending"));
  };

  const handleFilterApply = () => {
    dispatch(setPriceFilter(newPrice));
    dispatch(setBrandFilter(newBrand));
  };

  const handleFilterReset = () => {
    setNewBrand(null);
    setNewPrice(null);
    dispatch(setSortBy("none"));
    dispatch(setPriceFilter(null));
    dispatch(setBrandFilter(null));
    dispatch(setProductNameFilter(""));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
        setDataLoaded(true);
      } catch (error) {
        console.error("API request failed:", error);
        if (axios.isAxiosError(error) && error.response?.status === 500) {
          console.log("Retrying request...");
          await dispatch(fetchProducts());
          setDataLoaded(true);
        } else {
          console.error("Non-retryable error:", (error as Error).message);
        }
      }
    };
    fetchData();
  }, [dispatch]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
    router.push(`/?product=${product.id}`, undefined);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
    router.push("/", undefined);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const productId = query.get("product");
    if (productId) {
      const product = products.find((p) => p.id.toString() === productId);
      if (product) {
        setSelectedProduct(product);
        setIsPopupOpen(true);
      }
    }
  }, [pathname, products]);
  return (
    <div className="wrapper">
      <h1 className="title">Наши товары</h1>
      <section>
        <FilterProducts
          handleBrandFilterChange={handleBrandFilterChange}
          handleSortByLowestPrice={handleSortByLowestPrice}
          handleSortByHighestPrice={handleSortByHighestPrice}
          handleFilterApply={handleFilterApply}
          handleFilterReset={handleFilterReset}
          handleNameFilterChange={handleNameFilterChange}
          newBrand={newBrand}
          valueName={productNameFilter}
          brands={brands}
        />
        <div className="container">
          {loading && <Loader />}
          {!loading && !error && dataLoaded && products.length === 0 && (
            <Error />
          )}
          {!loading && error && <Error />}
          {products.length !== 0 &&
            !loading &&
            filteredProducts.map((item) => (
              <div key={item.id} onClick={() => handleProductClick(item)}>
                <CardProduct product={item} />
              </div>
            ))}
        </div>
        {products.length !== 0 && !loading && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="pagination_btn"
              disabled={currentPage === 1}
            >
              Назад
            </button>
            <span>
              {currentPage} {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="pagination_btn"
              disabled={currentPage === totalPages}
            >
              Вперёд
            </button>
          </div>
        )}
      </section>
      {selectedProduct && isPopupOpen && (
        <Modal
          isOpen={isPopupOpen}
          onRequestClose={closePopup}
          selectedProduct={selectedProduct}
        >
          <CardProduct product={selectedProduct} />
        </Modal>
      )}
    </div>
  );
}

export default PageMain;
