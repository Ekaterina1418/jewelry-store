
import style from "./card-products.module.css";

type Props = {
  product: {
    title: string;
    id: number;
    price: number;
    category: string;
    images: string[];
  };
};

export const CardProduct = ({ product }: Props) => {

  const brandStyle = product.title !== null ? style.card__brand : undefined;
  return (
    <>
      <div className={style.card}>
        <img
          src={product.images[0]}
          className={style.card__image}
          alt="Product Image"
        />

        <ul className={style.card__list} role="list">
          <li className={brandStyle}>{product.title}</li>
          <li className={style.card__name}>{product.category}</li>
          <li className={style.card_price}>{product.price} ₽</li>
        </ul>
      </div>
    </>
  );
};
