import { type CartItem } from "../types/index";

function CartItem({ title, quantity, price }: CartItem) {
  return ( 
    <>
      <tr>
        <td>{title}</td>
        <td>{quantity}</td>
        <td>${(price * quantity).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default CartItem;