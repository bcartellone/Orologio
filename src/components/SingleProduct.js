import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = ({token, isLoggedIn, setIsLoggedIn}) => {
    const { id } = useParams();

    const [singleProduct, setSingleProduct] = useState({})
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
    const fetchSingleProduct = async () => {
        try {
            const response = await fetch(`/api/products/${id}`)
            const data = await response.json();
            console.log("this is the response:", data)
            setSingleProduct(data)
           console.log("token:", token)
        } catch (error) {
            console.log(error)
        }
    };
    fetchSingleProduct();
    }, []);

    const handleSubmit = async () => {
        try {
            console.log('this is the quantitiy', quantity)
            if (isLoggedIn) {
            const response = await fetch(`/api/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                
                },
                body: JSON.stringify({
                        productId: singleProduct.id,
                        quantity: quantity
                })
            })
            const data = await response.json();
        } else {
            console.log('this is the quantity', quantity)
            const response = await fetch(`/api/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                        productId: singleProduct.id,
                        quantity: quantity
                })
            })
            const data = await response.json();
        }
        
            
        // console.log("this is the response:", data)
            
        } catch (error) {
            console.log(error)
        }
    } 
    
    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
                <img src={singleProduct.image} alt={singleProduct.description} ></img>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                <h1 style={{ textAlign: 'center'}}>{singleProduct.name}</h1>
                <p style={{ textAlign: 'center'}}>{singleProduct.description}</p>
            </div>
            <div style={{ border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>${singleProduct.price}</h1>
                <select value={quantity} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button onClick={handleSubmit}>Add to Cart</button>
            </div>
        </div>
    )
};

export default SingleProduct; 

