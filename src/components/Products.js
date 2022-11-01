import Product from './Product'
import { useState, useEffect } from 'react'


const Products = () => {
    // const {} = useContext(CartContext)
    //useState returns an Array from which 1st is data and 2nd is function reference [products, setProducts]
    const [products, setProducts] = useState([])
    useEffect(() => {
        //You can do anything here like calling fetch API like below (proxy need to be added in package.json file)
        //"proxy":"http://localhost:5000" (Add this line at the end of package.json proxy is server address)
        //if not work restart the react server

        fetch('/api/products')
        .then(response => response.json())
        .then(products =>{
            setProducts(products)
        })
    }, []) //executes only 1 time
    

    return (
            <div className="container mx-auto pb-24">
                <h1 className="text-lg font-bold my-8">Products</h1>
                <div className="grid grid-cols-5 my-8 gap-24">
                    {/*You can write JS code in JSX within {} like below */}
                    {
                        products.map(product => <Product key={product._id} product={product}/>)
                    }
                </div>
            </div>
    )
}

export default Products
