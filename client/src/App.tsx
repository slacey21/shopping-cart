import React from 'react';
import Header from "./components/Header.tsx";
import AddProductForm from "./components/AddProductForm.tsx";
import ProductListing from "./components/ProductListing.tsx";
import { type Product, type CartItem } from "./types/index.ts";
import { getProducts, getCart } from "./services/api.ts";

function App() {
  const [addProductShown, setAddProductShown] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<Product[]>([]);  
  const [cart, setCart] = React.useState<CartItem[]>([]);
  
  const handleShowAddProductForm = () => {
    setAddProductShown(!addProductShown);
  }

  React.useEffect(() => {
    (async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    })();
  }, []);
  
  React.useEffect(() => {
    (async () => {
      const fetchedCart = await getCart();
      setCart(fetchedCart);
    })();
  }, []);
  
  return (
    <div id="app">
      <Header cart={cart} setCart={setCart}/>
      <main>
      <ProductListing
        products={products}
        cart={cart}
        setProducts={setProducts}
        setCart={setCart}
      />
      {addProductShown
        ? <AddProductForm onShowAddProduct={handleShowAddProductForm} setProducts={setProducts}/>
        : <button onClick={handleShowAddProductForm}>Add a Product</button> 
      }
      </main>
    </div>
  )
}

export default App;
