import logoImg from '../assets/logo.jpg'; 

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
                    <button onClick={handleOpenCartClick}>Cart (0)</button>
                </p>
            </nav>
        </header>
    )
}