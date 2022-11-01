import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import ProductsPage from "./pages/ProductsPage"
import Cart from "./pages/Cart"
import Navigation from "./components/Navigation"
import SingleProduct from "./pages/SingleProduct"
import {CartContext} from "./CartContext"
import { useEffect, useState } from "react"
import {getCart, storeCart} from "./helpers"

// For single element
// function App(){
//     return <h1>Hello World</h1>
// }

//For multiple elements
// function App(){
//     return (
//         <div>
//             <h1>Hello World</h1>
//             <p>Hello paragraph</p>
//         </div>
//     )
// }

//If you don't want extra div
function App(){
    const [cart, setCart] = useState({})
    
    //fetch cart from local storage
    useEffect(() => {
        //Getting cart from helpers.js file. Promise will make sure that we get cart from getCart function
        getCart().then(cart => {
            setCart(JSON.parse(cart))
        })
    }, [])
    
    //whenever cart gets updated below function will execute
    //Set cart into local storage
    useEffect(() => {
        //calling storeCart defined in helpers.js file
        storeCart(JSON.stringify(cart))
      }, [cart])

    return (
        <>
            <Router>
                <CartContext.Provider value={{cart,setCart}}>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/products" element={<ProductsPage/>}></Route>
                        <Route path="/products/:_id" element={<SingleProduct/>}></Route>
                        <Route path="/cart" element={<Cart/>}></Route>
                    </Routes>
                </CartContext.Provider>
            </Router>
        </>
    )
}


export default App;