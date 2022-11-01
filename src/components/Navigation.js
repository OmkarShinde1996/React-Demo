import {Link} from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../CartContext"


const Navigation = () => {
    const cartStyle = {
        background : '#F59E0D',
        color: '#fff',
        display: 'flex',
        padding: '6px 12px',
        borderRadius: '50px',
    }

    const {cart} = useContext(CartContext)

    return (
        <>
            {/* <Link to="/">Home</Link>We can navigate to multiple pages without reloading the page using Link */}
            {/* <Link to="/about">About</Link> */}
            <nav className="container mx-auto flex items-center justify-between py-2">
                    <Link to="/">
                        <img style={{height:70}} src="/images/pizzalogo.png" alt="logo"/>
                    </Link>
                    <ul className="flex items-center">
                        <li><Link to="/">Home</Link></li>
                        <li className="ml-6"><Link to="/products">Products</Link></li>
                        <li className="ml-6">
                            <Link to="/cart">
                                <div style={cartStyle}>
                                    <span className="mr-2">{cart.totalItems ? cart.totalItems : 0}</span>
                                    <i className="bi bi-basket2"></i>
                                </div>
                            </Link>
                        </li>
                    </ul>
            </nav>
        </>
    )
}

export default Navigation
