import { type CartItem } from "../types/index";
import React from "react";
import { CurrencyContext } from "../providers/CurrencyProvider";

function CartItem({ title, quantity, price }: CartItem) {
  const { currency } = React.useContext(CurrencyContext);
  const currencySymbol = currency === "usd" ? "$" : '€';
  
  return ( 
    <>
      <tr>
        <td>{title}</td>
        <td>{quantity}</td>
        <td>{currencySymbol}{(price * quantity).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default CartItem;