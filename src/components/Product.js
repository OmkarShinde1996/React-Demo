import { Link } from "react-router-dom"
import { useContext,useState } from "react"
import { CartContext } from "../CartContext"

const Product = (props) => {
    //Below line is written to change the text and color of Add to cart button
    const [isAdding, setIsAdding] = useState(false)
    const {cart,setCart} = useContext(CartContext)
    const {product} = props
    const addToCart = (event, product) => {
        event.preventDefault()
        let _cart = {...cart} //Cloning the object
        //making sure that cart key has items object
        if(!_cart.items){
            _cart.items = {}
        }
        //making sure that items object in cart key already has product id or not
        //if has the increase its value by 1 if not then add it in items object
        if(_cart.items[product._id]){
            _cart.items[product._id] += 1
        }else{
            _cart.items[product._id] = 1
        }
        //making sure that totalItems key is present in cart object
        if(!_cart.totalItems){
            _cart.totalItems = 0
        }
        //increasing the totalItems value by 1 whenever add to cart button gets clicked
        _cart.totalItems += 1
        //setting up the cart value
        setCart(_cart)
        //Setting isAdding to true so that button color will be green
        setIsAdding(true)
        //Setting timeout for changing button color back to orange
        setTimeout(() => {
            //Setting isAdding to false so that button color will be orange
            setIsAdding(false)
        }, 1000);

        // const cart = {
        //     items:{

        //     },
        //     totalItems:5,
        // }
    }
    return (
        <Link to={`/products/${product._id}`}>
            <div>
                <img src={product.image} alt="pizza"></img>
                <div className="text-center">
                    <h2 className="text-lg font-bold py-2">{product.name}</h2>
                    <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{product.size}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span>₹ {product.price}</span>
                    <button disabled={isAdding} onClick={(e)=>{addToCart(e, product)}} className={`${isAdding ? 'bg-green-400 ' : 'bg-orange-400 '}py-1 px-4 rounded-full font-bold`}>ADD{isAdding ? 'ED' : ''}</button>
                </div>
            </div>
        </Link>
    )
}

export default Product
