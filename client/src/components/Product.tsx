import {
  type Product as ProductType,
  type CartItem as CartItemType
} from "../types/index.ts";
import { useState } from "react";
import EditProductForm from "./EditProductForm.tsx";
import { deleteProduct, addToCart } from "../services/api.ts";

interface ProductProps {
  product: ProductType;
  products: ProductType[];
  cart: CartItemType[];
  handleUpdateProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleUpdateCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

function Product({
  product,
  products,
  cart,
  handleUpdateProducts,
  handleUpdateCart
}: ProductProps) {
  const [isEditProductForm, setIsEditProductForm] = useState(false);
  
  const handleToggleEditProductForm = (status: boolean) => {
    setIsEditProductForm(status);
  };

  const handleDeleteProduct = () => {
    (async () => {
      try {
        const deleteStatus = await deleteProduct(product._id);
        if (deleteStatus - 200 > 99) {
          throw new Error(`Error: Product could not be deleted, operation returned status ${deleteStatus}`);
        } else {
          handleUpdateProducts(products.filter(p => p._id !== product._id));
        }
      } catch(e: unknown) {
        console.log(e);
      }
    })();
  }

  const updateProducts = (updatedProduct: ProductType): void => {
    const newProducts = products.map(product => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      }
      return product;
    });
    handleUpdateProducts(newProducts);
  };

  const updateCart = (updatedCartItem: CartItemType): void => {
    const existingCartItem = cart.find(cartItem => cartItem._id == updatedCartItem._id);
    if (existingCartItem) {
      const newCartItems = cart.map(cartItem => {
        if (cartItem._id === existingCartItem._id) {
          return updatedCartItem;
        }
        return cartItem;
      });
      handleUpdateCart(newCartItems);
    } else {
      handleUpdateCart(cart.concat(updatedCartItem));
    }
  };

  const handleAddToCart = () => {
    (async () => {
      try {
        const response = await addToCart(product._id) ;
        const updatedProduct = response.product;
        const updatedCartItem = response.item;
        updateProducts(updatedProduct);
        updateCart(updatedCartItem);
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }

  return (
    <li key={product._id} className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
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
          handleToggleEditProductForm={handleToggleEditProductForm}
          handleUpdateProducts={handleUpdateProducts}
        />
      }
    </li>
  )
}

export default Product;