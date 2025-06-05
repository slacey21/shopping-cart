import {
  type Product as ProductType,
  type CartItem as CartItemType
} from "../types/index.ts";
import { useState } from "react";
import EditProductForm from "./EditProductForm.tsx";
import Product from "./Product.tsx";

interface ProductProps {
  product: ProductType;
  products: ProductType[];
  cart: CartItemType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

function EditableProduct({
  product,
  products,
  cart,
  setProducts,
  setCart
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
        cart={cart}
        setProducts={setProducts}
        setCart={setCart}
      />
      {isEditProductForm
      && <EditProductForm
          products={products}
          productId={product._id}
          onToggleEditProductForm={handleToggleEditProductForm}
          setProducts={setProducts}
        />
      }
    </>
  )
}

export default EditableProduct;