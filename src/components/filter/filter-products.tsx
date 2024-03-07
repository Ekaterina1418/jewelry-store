import style from './filter-products.module.css';
import { ChangeEvent } from 'react';


type Props = {
    handleSortByLowestPrice: () => void;
    handleSortByHighestPrice: () => void;
    handleBrandFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleFilterApply: () => void;
    handleFilterReset: () => void;
    handleNameFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    newBrand: string | null;
    valueName: string;
};


export const FilterProducts = ({
    handleSortByLowestPrice,
    handleSortByHighestPrice,
    handleBrandFilterChange,
    handleFilterApply,
    handleFilterReset,
    handleNameFilterChange,
    newBrand,
    valueName
}: Props) => {
   
    return (
        <div className={style.filters}>
            <button className={style.button} onClick={handleSortByLowestPrice}>
                сначала дешёвые
            </button>
            <button className={style.button} onClick={handleSortByHighestPrice}>
                сначала дорогие
            </button>
            <input
                className={style.filters__input}
                type="text"
                value={valueName}
                onChange={handleNameFilterChange}
            />
            <label>
                <select className={style.filters__select}
                    value={newBrand || ""}
                    onChange={handleBrandFilterChange}
                >
                    <option value="">Выберите бренд</option>
                    <option value="Baraka">Baraka</option>
                    <option value="Piaget">Piaget</option>
                    <option value="Jacob  & Co">Jacob & Co</option>
                    <option value="Bibigi">Bibigi</option>
                    <option value="Cartier">Cartier</option>
                </select>
            </label>
            <button className={style.button} onClick={handleFilterApply}>
                Применить фильтры
            </button>
            <button className={style.button} onClick={handleFilterReset}>
                Сбросить фильтры
            </button>
        </div>
    );
};
