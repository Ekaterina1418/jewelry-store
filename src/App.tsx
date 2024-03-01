import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { setCurrentPage } from "./store/products/products.slice";
import { ITEMS_PER_PAGE } from "./utils/constants";
import { Product } from "./types/index";

function App() {
    const products = useSelector((state: RootState) => state.products);
    const loading = useSelector((state: RootState) => state.products.loading);
    const error = useSelector((state: RootState) => state.products.error);

    const dispatch: AppDispatch = useDispatch();

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
    };
    const startIndex = (products.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const productsToShow = products.products.slice(startIndex, endIndex);

    function removeDuplicates(array: Product[], key: keyof Product): Product[] {
        const seen = new Set<string | number>();
        return array.filter((item) => {
            const itemId = item[key];
            if (itemId !== null) {
                return seen.has(itemId) ? false : seen.add(itemId);
            }
            return false;
        });
    }

    const uniqueProducts = removeDuplicates(productsToShow, "id");

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchIdProducts());
            if (products.ids) {
                await dispatch(fetchProducts());
            }

            setDataLoaded(true);
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Наши товары</h1>
            <section>
                <div className={style.container}>
                    {loading && <Loader />}
                    {!loading &&
                        !error &&
                        dataLoaded &&
                        products.products.length === 0 && <Error />}

                    {!loading && error && <Error />}
                    {productsToShow.length !== 0 &&
                        !loading &&
                        uniqueProducts.map((item) => (
                            <CardProduct key={item.id} product={item} />
                        ))}
                </div>
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
                        disabled={products.currentPage === products.totalPages}
                    >
                        Вперёд
                    </button>
                </div>
            </section>
        </div>
    );
}

export default App;
