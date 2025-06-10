import { type Product as ProductType } from "../types/index.ts";
import { useState } from "react";
import EditProductForm from "./EditProductForm.tsx";
import Product from "./Product.tsx";
import { ProductReducerAction } from "../reducers/productsReducer.ts";
import { CartReducerAction } from "../reducers/cartReducer.ts";

interface ProductProps {
  product: ProductType;
  products: ProductType[];
  productsDispatch: React.ActionDispatch<[action: ProductReducerAction]>;
  cartDispatch: React.ActionDispatch<[action: CartReducerAction]>
}

function EditableProduct({
  product,
  products,
  productsDispatch,
  cartDispatch
}: ProductProps) {
  const [isEditProductForm, setIsEditProductForm] = useState(false);
  
  const handleToggleEditProductForm = (status: boolean) => {
    setIsEditProductForm(status);
  };

  return (
    <>
      <Product 
        product={product}
        products={products}
        productsDispatch={productsDispatch}
        cartDispatch={cartDispatch}
      />
      {isEditProductForm
      && <EditProductForm
          products={products}
          productId={product._id}
          onToggleEditProductForm={handleToggleEditProductForm}
          productsDispatch={productsDispatch}
        />
      }
    </>
  )
}

export default EditableProduct;