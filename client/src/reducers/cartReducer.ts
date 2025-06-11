import { CartItem } from "../types/index";

interface AddItemAction {
  type: "ADD_ITEM";
  payload: CartItem;
}

interface CheckoutAction {
  type: "CHECKOUT";
}

interface SetCartAction {
  type: "SET_CART";
  payload: CartItem[];
}

interface UpdateItemPricesAction {
  type: "UPDATE_PRICES";
  payload: {conversionRate: number};
}

export type CartReducerAction = 
  | AddItemAction
  | CheckoutAction
  | SetCartAction
  | UpdateItemPricesAction;

export const CartActions = {
  AddItem: (payload: CartItem): AddItemAction => ({
    type: "ADD_ITEM",
    payload,
  }),
  Checkout: (): CheckoutAction => ({type: "CHECKOUT"}),
  SetCart: (payload: CartItem[]): SetCartAction => ({
    type: "SET_CART",
    payload,
  }),
  UpdateItemPrices: (payload: { conversionRate: number }): UpdateItemPricesAction => ({
    type: "UPDATE_PRICES",
    payload
  }),
};

export function cartReducer(prev: CartItem[], action: CartReducerAction): CartItem[] {
  const { type } = action;
  
  switch (type) {
    case "ADD_ITEM":
      if (prev.find(cartItem => cartItem._id === action.payload._id)) {
        return prev.map(c => {
          if (c._id === action.payload._id) {
            return action.payload;
          }
          return c;
        })
      }
      
      return prev.concat(action.payload);

    case "CHECKOUT":
      return [];
    
    case "SET_CART":
      return action.payload;

    case "UPDATE_PRICES": {
      const conversionRate = action.payload.conversionRate;
      
      const updatedItems = prev.map(item => {
        return { ...item, price: item.price * conversionRate}
      });

      return updatedItems;
    }
      
      
    default:
      throw new Error(`Incorrect 'type' field in object passed to dispatch function: ${type}`);
  }
}
