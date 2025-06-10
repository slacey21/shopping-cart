import { Product } from "../types/index";

export type sortKey = "title" | "price" | "quantity";

interface AddProductAction {
  type: "ADD_PRODUCT";
  payload: Product;
}

interface UpdateProductAction {
  type: "UPDATE_PRODUCT";
  payload: Product;
}

interface DeleteProductAction {
  type: "DELETE_PRODUCT";
  payload: Product;
}

interface SetProductsAction {
  type: "SET_PRODUCTS";
  payload: Product[]
}

interface SortProductsAction {
  type: "SORT_PRODUCTS";
  payload: { sortKey: sortKey };
}

export type ProductReducerAction = 
  | AddProductAction
  | UpdateProductAction
  | DeleteProductAction
  | SetProductsAction
  | SortProductsAction;

export interface ProductState {
  items: Product[];
  sortKey: sortKey;
}

export const ProductActions = {
  AddProduct: (payload: Product): AddProductAction => ({
    type: "ADD_PRODUCT",
    payload,
  }),
  UpdateProduct: (payload: Product): UpdateProductAction => ({
    type: "UPDATE_PRODUCT",
    payload,
  }),
  DeleteProduct: (payload: Product): DeleteProductAction => ({
    type: "DELETE_PRODUCT",
    payload,
  }),
  SetProducts: (payload: Product[]): SetProductsAction => ({
    type: "SET_PRODUCTS",
    payload
  }),
  SortProducts: (payload: { sortKey: "title" | "price" | "quantity" }): SortProductsAction => ({
    type: "SORT_PRODUCTS",
    payload
  }),
};

const initialProductState: ProductState = {
  items: [],
  sortKey: "title"
};

const sortProducts = (items: Product[], sortKey: sortKey): Product[] => {
  switch (sortKey) {
    case "title":
      return [...items].sort((a, b) => a.title.localeCompare(b.title));
    case "price":
      return [...items].sort((a, b) => b.price - a.price);
    case "quantity":
      return [...items].sort((a, b) => b.quantity - a.quantity);
    default:
      return items;
  }
}

export function productReducer(
  prev: ProductState = initialProductState,
  action: ProductReducerAction
): ProductState {
  const { type, payload } = action;
  
  switch (type) {
    case "ADD_PRODUCT":
      return {
        items: sortProducts(prev.items.concat(payload), prev.sortKey),
        sortKey: prev.sortKey,
      }

    case "UPDATE_PRODUCT": {
      const updatedProducts = prev.items.map(item => {
          if (item._id === payload._id) {
            return payload;
          }
          return item;
        });

      return {
        items: sortProducts(updatedProducts, prev.sortKey),
        sortKey: prev.sortKey,
      }
    }

    case "DELETE_PRODUCT":
      return {
        items: prev.items.filter(item => item._id !== payload._id),
        sortKey: prev.sortKey,
      }

    case "SET_PRODUCTS":
      return {
        items: sortProducts(payload, prev.sortKey),
        sortKey: prev.sortKey
      };

    case "SORT_PRODUCTS":
      return {
        items: sortProducts(prev.items, payload.sortKey),
        sortKey: payload.sortKey
      }
      
    default:
      throw new Error(`Incorrect 'type' field in object passed to dispatch function: ${type}`);
  }
}
