import React, { useState, useEffect } from 'react';

import './Shop.css';

const Shop = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
   
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api');
                const data = await response.json();
                console.log(data);
                console.log(data.data);
                    setProducts(data.data.products);
                } catch (error) {
                    console.error(error);
            }
        
    };

    fetchProducts();
        
    }, []);

    return (
        <div className="productCards">
            {
            <h2> {
                products.length ? products.map((currentProduct, idx) => {
                    console.log(currentProduct);
                return <div key={idx}>
                        <div className ="indivProduct">   
                            <p>{currentProduct.title}</p>
                            <p>{currentProduct.description}</p>
                            <p>{currentProduct.author.username}</p>
                        </div> 
                        
                    </div>
                    }) : <div>No products to display!</div>
                }
            </h2>    
                
            }

        </div>
    )
}

export default Shop; 