import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
   
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();

                console.log(data);
                    setProducts(data);
                } catch (error) {
                    console.error(error);
            }
        
        };

    fetchProducts();
        
    }, []);

    function view (e) {
        navigate(`/shop/${e.target.value}`)
    }

    return (
        <div className='shop'>
            {
             
                products.length ? products.map((currentProduct, idx) => {
                    console.log(currentProduct);
                return (
                        <div className ="indivProduct" key={idx}>   
                            <p>{currentProduct.name}</p>
                            <p>${currentProduct.price}</p>
                            <p>{currentProduct.description}</p>
                            <button value={currentProduct.id} onClick={view}>VIEW</button>
                            <img className='product-img' src={currentProduct.image} alt={currentProduct.description}></img>
                        </div> 
                    )}) : <div>No products to display!</div>
                
            }

        </div>
    )
}

export default Shop; 