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
        <div className='shopContainer'>
        <div className='shopBox'>
            
            {
             
                products.length ? products.map((currentProduct, idx) => {
                    console.log(currentProduct);

                return (
                        <div className ="indivProduct" key={idx}>
                            <div className ="indivProductComps">
                            <img className='product-img' src={currentProduct.image} alt={currentProduct.description}></img>
                            <h3 className="product-brand">{currentProduct.brand}</h3>
                            <p className="product-name">{currentProduct.name}</p>
                            <p className="product-price">${currentProduct.price}</p>
                            {/* <p>{currentProduct.description}</p> */}
                            <button className="viewButton" value={currentProduct.id} onClick={view}>VIEW</button>
                        
                       
                        </div>    
                        </div>    
                    )}) : <div>
                            <h1>CURRENTLY DOWN FOR MAINTENANCE</h1>
                          </div>
                
            }
        </div>
        </div>
        
    )
}

export default Shop; 