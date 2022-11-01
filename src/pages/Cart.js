import {useContext, useEffect, useState} from 'react'
import { CartContext } from '../CartContext'


const Cart = () => {
  let total = 0
  const [priceFetched, togglePriceFetched] = useState(false)
  const [products, setProducts] = useState([])
  const {cart, setCart} = useContext(CartContext)

  
  useEffect(() => {
      if(!cart.items){
        return
      }
      //making sure that we do not send request on server again and again when we increase or decrease the 
      //cart items qty.
      if(priceFetched){
        return
      }

      fetch('/api/products/cart-items',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ids: Object.keys(cart.items)})
      }).then(res => res.json())
      .then(products => {
        setProducts(products)
        togglePriceFetched(true)
      })
  }, [cart,priceFetched])
  
  const getQuantity = (productId) => {
    return cart.items[productId]
  }

  const increment = (productId) => {
    const existingQty = cart.items[productId] //storing the existing qty
    const _cart = {...cart}//making clone of the object
    _cart.items[productId] = existingQty + 1 //adding 1 qty when + button is clicked
    _cart.totalItems += 1 //updating totalQty when + button is clicked
    setCart(_cart)//setting up the _cart so that it will get updated everywhere like navBar and local storage
  }

  const decrement = (productId) => {
    //making sure that qty never goes below 1
    if(existingQty === 1){
      return
    }
    const existingQty = cart.items[productId] //storing the existing qty
    const _cart = {...cart}//making clone of the object
    _cart.items[productId] = existingQty - 1 //reducing 1 qty when - button is clicked
    _cart.totalItems -= 1 //updating totalQty when - button is clicked
    setCart(_cart)//setting up the _cart so that it will get updated everywhere like navBar and local storage
  }

  const getSum= (productId, price) => {
    const sum = price * getQuantity(productId)
    total += sum
    return sum
  }

  const handleDelete = (productId) => {
    const _cart = {...cart} //cloning the original object
    const qty = _cart.items[productId] //Storing the qty of the product which we are deleting
    delete _cart.items[productId] //deleting the product id from items object present in _cart object
    _cart.totalItems -= qty //reducing the deleted product qty from totalItems
    setCart(_cart) //Setting up the new _cart so that it will get updated everywhere
    setProducts(products.filter((product)=> product._id !== productId))//This filtering will make sure that 
    //item gets deleted from list in realtime and will be shown on the screen
  }

  const handleOrderNow = () => {
    window.alert('Order placed succesfully!')//showing alter to the user
    setProducts([]) //clearing up the Products
    setCart([]) //clearing up the Cart
  }

  return (
    !products.length 
    ? <img style={{height:300, width:300}} className='mx-auto w-1/2 mt-12' src='/images/emptycart.png'></img>
    :
    <div className='container mx-auto lg:w-1/2 w-full pb-24'>
      <h1 className='my-12 font-bold'>Cart items</h1>
      <ul>
        {
          products.map(product => {
            return (
              <li className='mb-12' key={product._id}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img className='h-16' src={product.image} alt=''/>
                    <span className='font-bold ml-4 w-48'>{product.name}</span>
                  </div>
                  <div>
                    <button className='bg-orange-400 px-4 py-2 rounded-full leading-none' onClick={()=>{decrement(product._id)}}>-</button>
                    <b className='px-4'>{getQuantity(product._id)}</b>
                    <button className='bg-orange-400 px-4 py-2 rounded-full leading-none' onClick={()=>{increment(product._id)}}>+</button>
                  </div>
                  <span>₹ {getSum(product._id, product.price)}</span>
                  <button className='bg-red-500 px-4 py-2 rounded-full leading-none text-white' onClick={()=>{handleDelete(product._id)}}>Delete</button>
                </div>
              </li>
            )
          })
        }
      </ul>
      <hr className='my-6'/>
      <div className='text-right'>
        <b>Grand Total:</b> ₹ {total}
      </div>
      <div className='text-right mt-6'>
        <button className='bg-orange-400 px-4 py-2 rounded-full leading-none hover:text-white' onClick={handleOrderNow()}>Order Now</button>
      </div>
    </div>
  )
}

export default Cart
