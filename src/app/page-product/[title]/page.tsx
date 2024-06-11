"use client";

import { useParams } from "next/navigation";
import { CardProduct } from "@/components/card/card-product";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/index";
import { useEffect, useState } from "react";
import { Product } from "@/types";

const ProductPage = () => {
  const routerParams = useParams();
  const { title } = routerParams;

  const [product, setProduct] = useState<Product | null>(null);
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    if (title && products.length > 0) {
      const foundProduct = products.find((p) => p.title === title);

      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [title, products]);
  console.log(product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <CardProduct product={product} />
    </div>
  );
};

export default ProductPage;
