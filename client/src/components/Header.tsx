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
        if (checkoutComplete - 200 > 100) {
          throw new Error(`Error: could not checkout, operation failed with status ${checkoutComplete}`);
        } else {
          setCart([]);
        }
      } catch(e: unknown) {
        console.log(e);
      }
    })();
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
                {cartTotal === 0 ? "" : `$${cartTotal.toFixed(2)}`}
              </td>
            </tr>
          </tfoot>
        </table>
        <button
          className="checkout"
          disabled={cartTotal === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
    </div>
    </header>
  )
}

export default Header;