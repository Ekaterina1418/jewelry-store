import style from "./filter-products.module.css";
import { ChangeEvent } from "react";

type Props = {
  handleSortByLowestPrice: () => void;
  handleSortByHighestPrice: () => void;
  handleBrandFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleFilterApply: () => void;
  handleFilterReset: () => void;
  handleNameFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  newBrand: string | null;
  valueName: string;
  brands: string[];
};

export const FilterProducts = ({
  handleSortByLowestPrice,
  handleSortByHighestPrice,
  handleBrandFilterChange,
  handleFilterReset,
  handleNameFilterChange,
  newBrand,
  valueName,
  brands,
}: Props) => {
  return (
    <>
      <div className={style.filters}>
        <button className={style.button} onClick={handleSortByLowestPrice}>
          сначала дешёвые
        </button>
        <button className={style.button} onClick={handleSortByHighestPrice}>
          сначала дорогие
        </button>

        <label>
          <select
            className={style.filters__select}
            value={newBrand || ""}
            onChange={handleBrandFilterChange}
          >
            <option value="">Выберите бренд</option>
            <option value=""></option>
            {brands.map((singleBrand,index) => (
              <option key={index} value={singleBrand}>
                {singleBrand}
              </option>
            ))}
          </select>
        </label>
        <button className={style.button} onClick={handleFilterReset}>
          Сбросить фильтры
        </button>
      </div>
      <input
        className={style.filters__input}
        type="text"
        value={valueName}
        onChange={handleNameFilterChange}
      />
    </>
  );
};
