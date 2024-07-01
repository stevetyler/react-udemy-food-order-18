import logoImg from '../assets/logo.jpg'; 
import Button from './UI/Button';

function handleOpenCartClick() {

}

export default function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Food App Logo" />   
                <h1>React Food</h1>
            </div>
            <nav>
                <p>
                    <Button textOnly>Cart (0)</Button>
                </p>
            </nav>
        </header>
    )
}