import React from 'react';
import Header from "./components/Header.tsx";
import ToggleableAddProductForm from "./components/ToggleableAddProductForm.tsx"
import ProductListing from "./components/ProductListing.tsx";
import { getProducts, getCart } from "./services/api.ts";
import { productReducer, ProductActions, ProductState } from "./reducers/productsReducer.ts";
import { cartReducer, CartActions } from "./reducers/cartReducer.ts";
import { ThemeContext, ThemeContextType } from './providers/ThemeProvider.tsx';

function App() {
  const initialProductState: ProductState = {
    items: [],
    sortKey: "title"
  };
  const [products, productsDispatch] = React.useReducer(productReducer, initialProductState);
  const [cart, cartDispatch] = React.useReducer(cartReducer, []);
  const { theme } = React.useContext<ThemeContextType>(ThemeContext);
  console.log(theme);
  
  React.useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      productsDispatch(ProductActions.SetProducts(fetchedProducts));
    }
    fetchProducts();
  }, []);
  
  React.useEffect(() => {
    const fetchCart = async () => {
      const fetchedCart = await getCart();
      cartDispatch(CartActions.SetCart(fetchedCart));
    }
    fetchCart();
  }, []);
  
  return (
    <div id="app" className={theme === "dark" ? "dark" : ""}>
      <Header cart={cart} cartDispatch={cartDispatch}/>
      <main>
        <ProductListing
          products={products}
          productsDispatch={productsDispatch}
          cartDispatch={cartDispatch}
        />
        <ToggleableAddProductForm productsDispatch={productsDispatch}/>
      </main>
    </div>
  )
}

export default App;
