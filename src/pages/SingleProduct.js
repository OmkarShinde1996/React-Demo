import { useState,useEffect,useContext } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { CartContext } from '../CartContext'

const SingleProduct = () => {
  //Below line is written to change the text and color of Add to cart button
  const [isAdding, setIsAdding] = useState(false)
  const {cart,setCart} = useContext(CartContext)

  const [product, setProduct] = useState({})
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/api/products/${params._id}`)
        .then(response => response.json())
        .then(product =>{
          setProduct(product)
        })
  }, [params._id])
  
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
        <div className="container mx-auto mt-12">
            <button className="mb-12 font-bold" onClick={()=>navigate(-1)}>Back</button>
            <div className="flex">
                <img style={{height:200}} src={product.image} alt=""></img>
                <div className="ml-16">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <div className="text-md">{product.size}</div>
                    <div className="font-bold mt-2">₹ {product.price}</div>
                    <button disabled={isAdding} onClick={(e)=>{addToCart(e, product)}} className={`${isAdding ? 'bg-green-400 ' : 'bg-orange-400 '} py-1 px-8 rounded-full font-bold mt-4 hover:text-white`}>Add{isAdding ? 'ed' : ''} to cart</button>
                </div>
            </div>
        </div>
  )
}

export default SingleProduct
