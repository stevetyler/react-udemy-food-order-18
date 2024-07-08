import Modal from './UI/Modal.jsx';
import CartContext from "../store/CartContext";
import UserProgressContext from '../store/UserProgressContext';
import { useContext } from 'react';
import { currencyFormatter } from "../util/formatter";
import Button from './UI/Button';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.qty * item.price), 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  console.log('cartCtx', cartCtx);
  console.log('cartTotal', cartTotal);

  return <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
    <h2>Your Cart</h2>
    <ul>
      {cartCtx.items.map(item => (
        <li key={item.id}>
          {item.name} - {item.qty}
        </li>
      ))}
    </ul>
    <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
    <p className="modal-actions">
      <Button textOnly onClick={handleCloseCart}>Close</Button>
      <Button onClick={handleCloseCart}>Go to checkout</Button>
    </p>
  </Modal>
}