import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Checkout = () => {

    const navigate = useNavigate()
    useEffect(() => {
   
        const fetchCheckout = async () => {
            try {
                const response = await fetch('/api/cart');
                const data = await response.json();

                console.log(data);
                // setCart(data);
                } catch (error) {
                    console.error(error);
                }
        
        };
        fetchCheckout();
    }, []);

    function confirmation () {
        navigate('/Confirmation')
    }
    return (
        <div>
            <h1>Checkout</h1>
            <h2></h2>
            <button onClick={confirmation}>Click to confirm your order</button>
        </div>
    )
};


export default Checkout; 