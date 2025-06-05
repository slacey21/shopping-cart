import axios from "axios";
import { z } from "zod/v4";
import {
  productSchema,
  cartItemSchema,
  UpdateCartResponseSchema,
  type Product,
  type NewProduct,
  type CartItem,
  type UpdateCartResponse
} from "../types/index";

const productsSchema = z.array(productSchema);
const cartSchema = z.array(cartItemSchema);


export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('/api/products');
    const data = productsSchema.parse(response.data);
    return data;
  } catch(e) {
    console.log(e);
    throw e;
  }
};

export const getCart = async (): Promise<CartItem[]> => {
  try {
    const response = await axios.get('/api/cart');
    const data = cartSchema.parse(response.data);
    return data;
  } catch(e) {
    console.log(e);
    throw e;
  }
};

export const addProduct = async (newProduct: NewProduct): Promise<Product> => {
  try {
    const response = await axios.post('/api/products', newProduct);
    const data = productSchema.parse(response.data);
    return data;
  } catch(e) {
    console.log(e);
    throw e;
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const newValues: NewProduct = {
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    };
    const response = await axios.put(`/api/products/${product._id}`, newValues);
    const data = productSchema.parse(response.data);
    return data;
  } catch(e) {
    console.log(e);
    throw e;
  }
}

export const deleteProduct = async (productId: string): Promise<number> => {
  try {
    const response = await axios.delete(`/api/products/${productId}`);
    return response.status;
  } catch(e) {
    console.log(e);
    throw e;
  }
}

export const checkout = async (): Promise<number> => {
  try {
    const response = await axios.post(`/api/checkout`);
    return response.status;
  } catch(e) {
    console.log(e);
    throw e;
  }
};

export const addToCart = async (productId: string): Promise<UpdateCartResponse> => {
  try {
    const response = await axios.post(`/api/add-to-cart`, {productId});
    const data =  UpdateCartResponseSchema.parse(response.data);
    return data;
  } catch(e) {
    console.log(e);
    throw e;
  }
};