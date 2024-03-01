import style from './card-products.module.css'

type Props = {
  product: {
    brand: string | null;
    id: string;
    price: number;
    product:string

  }
}

export const CardProduct = ({product}:Props) => {
  return (
      <>
          <ul className={style.card} role="list">
              <li>{product.brand}</li>
              <li>{product.product}</li>
              <li>{product.price}</li>

              <li className={style.card_item}>{product.id}</li>
          </ul>
      </>
  );
}
