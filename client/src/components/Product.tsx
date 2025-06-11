import {
  type Product as ProductType,
  type CartItem as CartItemType
} from "../types/index.ts";
import { useState } from "react";
import EditProductForm from "./EditProductForm.tsx";
import { deleteProduct, addToCart } from "../services/api.ts";
import { ProductReducerAction, ProductActions } from "../reducers/productsReducer.ts";
import { CartReducerAction, CartActions } from "../reducers/cartReducer.ts";
import { CurrencyContext } from "../providers/CurrencyProvider.tsx";
import React from "react";

interface ProductProps {
  product: ProductType;
  products: ProductType[];
  productsDispatch: React.ActionDispatch<[action: ProductReducerAction]>;
  cartDispatch: React.ActionDispatch<[action: CartReducerAction]>;
}

function Product({
  product,
  products,
  productsDispatch,
  cartDispatch
}: ProductProps) {
  const [isEditProductForm, setIsEditProductForm] = useState(false);
  const { currency } = React.useContext(CurrencyContext);
  
  const handleToggleEditProductForm = (status: boolean) => {
    setIsEditProductForm(status);
  };

  const handleDeleteProduct = () => {
    (async () => {
      try {
        const deleted = await deleteProduct(product._id);
        if (deleted) {
          productsDispatch({
            type: "DELETE_PRODUCT",
            payload: product,
          })
        } else {
          throw new Error("Error: Product could not be deleted, operation did not return 200 response status");
        }
      } catch(e: unknown) {
        console.log(e);
      }
    })();
  }

  const handleUpdateProducts = (updatedProduct: ProductType): void => {
    productsDispatch(ProductActions.UpdateProduct(updatedProduct));
  };

  const handleUpdateCart = (updatedCartItem: CartItemType): void => {
    cartDispatch(CartActions.AddItem(updatedCartItem));
  };

  const handleAddToCart = () => {
    (async () => {
      try {
        const { product: updatedProduct, item: updatedCartItem } = await addToCart(product._id);
        handleUpdateProducts(updatedProduct);
        handleUpdateCart(updatedCartItem);
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }

  return (
    <li key={product._id} className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">{currency === "usd" ? "$" : "€"}{product.price.toFixed(2)}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            disabled={product.quantity === 0 || isEditProductForm}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="edit"
            onClick={() => handleToggleEditProductForm(true)}
            disabled={isEditProductForm}
          >
            Edit
          </button>
        </div>
        <button className="delete-button" onClick={handleDeleteProduct}>
          <span>X</span>
        </button>
      </div>
      {isEditProductForm
      && <EditProductForm
          products={products}
          productId={product._id}
          onToggleEditProductForm={handleToggleEditProductForm}
          productsDispatch={productsDispatch}
        />
      }
    </li>
  )
}

export default Product;