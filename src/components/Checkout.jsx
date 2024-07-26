import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { useContext } from 'react';
import { currencyFormatter } from "../util/formatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.qty * item.price), 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit (event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    });
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleCloseCheckout}>
      <form action="" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="full-name" name="name"/>
        <Input label="Email address" type="email" id="email" name="email"/>
        <Input label="Street" type="text" id="street" name="street"/>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" name="postal-code"/>
          <Input label="City" type="text" id="city" name="city"/>
        </div>

        <p className="modal-actions">
          <Button textOnly onClick={handleCloseCheckout}>Close</Button>
          <Button textOnly>Submit Order</Button>
        </p>
      </form>
    </Modal>
  )
}