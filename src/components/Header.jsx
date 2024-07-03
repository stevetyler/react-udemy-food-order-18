import logoImg from '../assets/logo.jpg'; 
import Button from './UI/Button';
import { useContext } from 'react';
import CartContext from '../store/CartContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
      return totalNumberOfItems + item.qty;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Food App Logo" />   
                <h1>React Food</h1>
            </div>
            <nav>
                <p>
                    <Button textOnly>Cart ({totalCartItems})</Button>
                </p>
            </nav>
        </header>
    )
}