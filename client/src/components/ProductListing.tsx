import EditableProduct from "./EditableProduct.tsx";
import React from "react";
import type { Product as ProductType } from "../types/index.ts";
import {
  ProductReducerAction,
  ProductActions,
  ProductState
 } from "../reducers/productsReducer.ts";
import { CartReducerAction } from "../reducers/cartReducer.ts";

interface ProductListingProps {
  products: ProductState;
  productsDispatch: React.ActionDispatch<[action: ProductReducerAction]>;
  cartDispatch: React.ActionDispatch<[action: CartReducerAction]>;
}

function ProductListing({
  products,
  productsDispatch,
  cartDispatch
}: ProductListingProps) {
  return (
    <div className="product-listing">
      <div className="product-listing-header">
        <h2>Products</h2>
        <div className="sort-options">
          <p>Sort:</p>
          <button
            className={products.sortKey === "title" ? "active" : "inactive"}
            onClick={() => productsDispatch(ProductActions.SortProducts({sortKey: "title"}))}
            >
            Title
          </button>
          <button
              className={products.sortKey === "price" ? "active" : "inactive"}
              onClick={() => productsDispatch(ProductActions.SortProducts({sortKey: "price"}))}
              >
            Price
          </button>
          <button
            className={products.sortKey === "quantity" ? "active" : "inactive"}
            onClick={() => productsDispatch(ProductActions.SortProducts({sortKey: "quantity"}))}
          >
            Quantity
          </button>
        </div>
      </div>
      <ul className="product-list">
        {products.items.map((product: ProductType) => 
          <EditableProduct
            key={product._id}
            product={product}
            products={products.items}
            productsDispatch={productsDispatch}
            cartDispatch={cartDispatch}
          />
        )}
      </ul>
    </div>
  );
}
 
export default ProductListing;