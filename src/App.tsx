import { useEffect, useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
    fetchIdProducts,
    fetchProducts,
} from "./store/products/products.slice";
import style from "./App.module.css";
import { RootState } from "./store/store";
import { AppDispatch } from "./store";
import { CardProduct } from "./components/card/card-product";
import { Loader } from "./components/loader/loader";
import { Error } from "./components/404/404";
import { setCurrentPage, setSortBy } from "./store/products/products.slice";
import { ITEMS_PER_PAGE } from "./utils/constants";
import { selectFilteredProducts } from "./store/filter/selectors";
import { setBrandFilter, setPriceFilter,setProductNameFilter } from "./store/filter/filters.slice";
import { FilterProducts } from "./components/filter/filter-products";




function App() {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products);
    const loading = useSelector((state: RootState) => state.products.loading);
    const error = useSelector((state: RootState) => state.products.error);
    const filteredProducts = useSelector(selectFilteredProducts);
    const productNameFilter = useSelector((state:RootState) => state.filters.productNameFilter)

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
    };

    const startIndex = (products.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [newPrice, setNewPrice] = useState<number | null>(null);
    const [newBrand, setNewBrand] = useState<string | null>(null);
  

    const handleNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
       dispatch(setProductNameFilter(event.target.value));
    };

    const handleBrandFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewBrand(event.target.value);
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
        setNewPrice(null)
        dispatch(setSortBy('none'))
        dispatch(setPriceFilter(null));
        dispatch(setBrandFilter(null));
        dispatch(setProductNameFilter(''));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchIdProducts());

                if (products.ids) {
                    await dispatch(fetchProducts());
                }

                setDataLoaded(true);
            } catch (error) {
                console.error("API request failed:", error);

                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 500
                ) {
                    console.log("Retrying request...");

                    await dispatch(fetchIdProducts());

                    if (products.ids) {
                        await dispatch(fetchProducts());
                    }

                    setDataLoaded(true);
                } else {
                    console.error(
                        "Non-retryable error:",
                        (error as Error).message
                    );
                }
            }
        };

        fetchData();
    }, [dispatch]);
    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Наши товары</h1>
            <section>
                <FilterProducts
                    handleBrandFilterChange={handleBrandFilterChange}
                    handleSortByLowestPrice={handleSortByLowestPrice}
                    handleSortByHighestPrice={handleSortByHighestPrice}
                    handleFilterApply={handleFilterApply}
                    handleFilterReset={handleFilterReset}
                    handleNameFilterChange={handleNameFilterChange}
                    newBrand={newBrand}
                    valueName=  {productNameFilter }
                />
                <div className={style.container}>
                    {loading && <Loader />}
                    {!loading &&
                        !error &&
                        dataLoaded &&
                        products.products.length === 0 && <Error />}

                    {!loading && error && <Error />}
                    {productsToShow.length !== 0 &&
                        !loading &&
                        productsToShow.map((item) => (
                            <CardProduct key={item.id} product={item} />
                        ))}
                </div>
                {productsToShow.length !== 0 && !loading && (
                    <div className={style.pagination}>
                        <button
                            onClick={() =>
                                handlePageChange(products.currentPage - 1)
                            }
                            className={style.pagination_btn}
                            disabled={products.currentPage === 1}
                        >
                            Назад
                        </button>
                        <span>
                            {products.currentPage} {products.totalPages}
                        </span>
                        <button
                            onClick={() =>
                                handlePageChange(products.currentPage + 1)
                            }
                            className={style.pagination_btn}
                            disabled={
                                products.currentPage === products.totalPages
                            }
                        >
                            Вперёд
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default App;
