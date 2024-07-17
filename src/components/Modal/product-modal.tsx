"use client";
import style from "./product-modal.module.css";
import { Product } from "@/types";
import { ReactNode } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

type Props = {
  children: ReactNode;
  onRequestClose: () => void;
  isOpen: boolean;
  selectedProduct: Product;
};

export const Modal = ({
  children,
  isOpen,
  onRequestClose,
  selectedProduct,
}: Props) => {
  return (
    <>
      {isOpen && selectedProduct && (
        <div className={style.popup_overlay} onClick={onRequestClose}>
          <Dialog open={isOpen} onClose={onRequestClose}>
            <div className={style.popup_overlay}>
              <DialogPanel className={style.popup_content}>
                <button onClick={onRequestClose} className={style.popup_btn}>
                  X
                </button>
                {children}
              </DialogPanel>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};
