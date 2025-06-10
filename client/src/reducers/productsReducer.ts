import { Product } from "../types/index";

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

export type ProductReducerAction = 
  | AddProductAction
  | UpdateProductAction
  | DeleteProductAction
  | SetProductsAction;

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
};

export function productReducer(_currentState: Product[], action: ProductReducerAction): Product[] {
  const { type, payload } = action;
  
  switch (type) {
    case "ADD_PRODUCT":
      return _currentState.concat(payload);

    case "UPDATE_PRODUCT":
      return _currentState.map(product => {
        if (product._id === payload._id) {
          return payload;
        }
        return product;
      });

    case "DELETE_PRODUCT":
      return _currentState.filter(product => product._id !== payload._id);

    case "SET_PRODUCTS":
      return payload;
      
    default:
      throw new Error(`Incorrect 'type' field in object passed to dispatch function: ${type}`);
  }
}
