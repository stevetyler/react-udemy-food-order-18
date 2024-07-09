import { currencyFormatter } from "../util/formatter"

export default function ({ name, qty, price, onIncrease, onDecrease}) {
  return <li className="cart-item">
    <p>
      {name} - {qty} x {currencyFormatter.format(price)}
    </p>
    <p className="cart-item-actions">
      <button onClick={onDecrease}>-</button>
      <span>{qty}</span>
      <button onClick={onIncrease}>+</button>
    </p>
  </li>
}