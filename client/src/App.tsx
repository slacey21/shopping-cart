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
  
  const showAddProductForm = () => {
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
      <Header cart={cart} handleUpdateCart={setCart}/>
      <main>
      <ProductListing
        products={products}
        cart={cart}
        handleUpdateProducts={setProducts}
        handleUpdateCart={setCart}
      />
      {addProductShown
        ? <AddProductForm handleShowAddProduct={showAddProductForm} handleAddNewProduct={setProducts}/>
        : <button onClick={showAddProductForm}>Add a Product</button> 
      }
      </main>
    </div>
  )
}

export default App;
