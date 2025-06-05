import Product from "./Product.tsx";
import type { Product as ProductType, CartItem as CartItemType } from "../types/index.ts";

interface ProductListingProps {
  products: ProductType[];
  cart: CartItemType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

function ProductListing({
  products,
  cart,
  setProducts,
  setCart
}: ProductListingProps) {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product: ProductType) => 
          <Product
            key={product._id}
            product={product}
            products={products}
            cart={cart}
            setProducts={setProducts}
            setCart={setCart}
          />
        )}
      </ul>
    </div>
  );
}
 
export default ProductListing;