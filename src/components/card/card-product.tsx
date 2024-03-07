import style from "./card-products.module.css";

type Props = {
    product: {
        brand: string | null;
        id: string;
        price: number;
        product: string;
    };
};

export const CardProduct = ({ product }: Props) => {
    const brandStyle = product.brand !== null ? style.card__brand : undefined
    return (
        <>
            <div className={style.card}>
                <div className={style.card__image}></div>
                <ul className={style.card__list} role="list">
                    <li className={brandStyle}>{product.brand}</li>
                    <li className={style.card__name}>{product.product}</li>
                    <li className={style.card_price}>{product.price} ₽</li>
                    <li className={style.card_id}>{product.id}</li>
                </ul>
            </div>
        </>
    );
};
