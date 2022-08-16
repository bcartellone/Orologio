import React, {useState, useEffect} from 'React';

import './Product.css';

const Product = () => {

    const [singleProduct,setSingleProduct] = useState([])

    useEffect (() => {
    const fetchProduct = async() => {
        try{
            const response = await fetch('/api/product/${');
            const data = await response.json();
            
            console.log(productdata);
            
            

        }catch(error) {
            console.error(error);
        }
    };
    fetchProduct();
    },[]);
    
    return (
        <div className="product">
            {
            <h2> {
                product.length ? product.map((product, idx) => {
                    console.log(currentProduct);
                return <div key={idx}>
                        <div className ="indivProduct">   
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <a>{product.image}</a>
                            <p>{product.price}</p>
                        </div> 
                        
                    </div>
                    }) : <p>nothing here</p>
                }
            </h2>    
                
            }

        </div>
    )
}

export default Product;