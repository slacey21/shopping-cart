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

export type CartReducerAction = AddItemAction | CheckoutAction | SetCartAction;

export const CartActions = {
  AddItem: (payload: CartItem): AddItemAction => ({
    type: "ADD_ITEM",
    payload,
  }),
  Checkout: (): CheckoutAction => ({type: "CHECKOUT"}),
  SetCart: (payload: CartItem[]): SetCartAction => ({
    type: "SET_CART",
    payload,
  })
};

export function cartReducer(_currentState: CartItem[], action: CartReducerAction): CartItem[] {
  const { type } = action;
  
  switch (type) {
    case "ADD_ITEM":
      if (_currentState.find(cartItem => cartItem._id === action.payload._id)) {
        return _currentState.map(c => {
          if (c._id === action.payload._id) {
            return action.payload;
          }
          return c;
        })
      }
      
      return _currentState.concat(action.payload);

    case "CHECKOUT":
      return [];
    
    case "SET_CART":
      return action.payload;
      
    default:
      throw new Error(`Incorrect 'type' field in object passed to dispatch function: ${type}`);
  }
}
