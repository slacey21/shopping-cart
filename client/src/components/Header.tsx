import CartItem from "./CartItem";
import { checkout } from "../services/api";
import { type CartItem as CartItemType } from "../types";

interface HeaderProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

function Header({ cart, setCart }: HeaderProps) {
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0)

  const handleCheckout = () => {
    (async () => {
      try {
        const checkoutComplete = await checkout();
        if (checkoutComplete) {
          setCart([]);
        } else {
          throw new Error("Error: could not checkout, operation failed - status code not 200");
        }
      } catch(e: unknown) {
        console.log(e);
      }
    })();
  }

  if (cart.length === 0){
    return (
      <header>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          <button className="checkout" disabled>Checkout</button>
        </div>
      </header>  
    )
  }
  
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(cartItem => {
              return <CartItem key={cartItem._id} {...cartItem}/>
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">
                ${cartTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <button className="checkout" onClick={handleCheckout}>Checkout</button>
      </div>
    </header>
  )
}

export default Header;