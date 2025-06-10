import EditableProduct from "./EditableProduct.tsx";
import React from "react";
import type { Product as ProductType } from "../types/index.ts";
import { ProductReducerAction } from "../reducers/productsReducer.ts";
import { CartReducerAction } from "../reducers/cartReducer.ts";

interface ProductListingProps {
  products: ProductType[];
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
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product: ProductType) => 
          <EditableProduct
            key={product._id}
            product={product}
            products={products}
            productsDispatch={productsDispatch}
            cartDispatch={cartDispatch}
          />
        )}
      </ul>
    </div>
  );
}
 
export default ProductListing;