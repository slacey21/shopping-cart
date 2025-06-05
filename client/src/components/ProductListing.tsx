import Product from "./Product.tsx";
import type { Product as ProductType, CartItem as CartItemType } from "../types/index.ts";

interface ProductListingProps {
  products: ProductType[];
  cart: CartItemType[];
  handleUpdateProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleUpdateCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

function ProductListing({
  products,
  cart,
  handleUpdateProducts,
  handleUpdateCart
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
            handleUpdateProducts={handleUpdateProducts}
            handleUpdateCart={handleUpdateCart}
          />
        )}
      </ul>
    </div>
  );
}
 
export default ProductListing;