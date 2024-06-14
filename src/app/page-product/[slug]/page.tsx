"use client";
import { Montserrat } from "next/font/google";
import { AppDispatch } from "@/lib/index";
import { useAppDispatch } from "@/lib/hooks";
import {
  setSelectedProduct,
  fetchProducts,
} from "@/lib/features/products/products.slice";
import { useParams } from "next/navigation";
import { CardProduct } from "@/components/card/card-product";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/index";
import { useEffect, useState } from "react";
import { Product } from "@/types";

const font = Montserrat({ subsets: ["latin"] });

const ProductPage = () => {
  const routerParams = useParams<{ slug: string }>();
  const titleParam = routerParams.slug;

  const dispatch: AppDispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    const fetchProduct = async () => {
      if (titleParam) {
        const title = Array.isArray(titleParam) ? titleParam[0] : titleParam;
        const decodedTitle = decodeURIComponent(title);

        if (products.length === 0) {
          await dispatch(fetchProducts());
        }

        const foundProduct = products.find((p) => p.title === decodedTitle);
        if (foundProduct) {
          setProduct(foundProduct);
          dispatch(setSelectedProduct(foundProduct));
        }
      }
    };

    fetchProduct();
  }, [products, titleParam, dispatch]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className={font.className}>Product Details</h2>
      <CardProduct product={product} />
    </div>
  );
};

export default ProductPage;
