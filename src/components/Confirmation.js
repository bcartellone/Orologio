import React, { useState, useEffect } from 'react';

import './Confirmation.css';

const Confirmation = () => {
    const [cartOrders, setCartOrders] = useState([]);

    useEffect(() => {
   
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/cart_orders');
                const data = await response.json();

                console.log(data);
                setCartOrders(data);
                } catch (error) {
                    console.error(error);
            }
        
        };

    fetchOrders();
        
    }, []);
    return (

            cartOrders.length ? cartOrders.map((currentCartOrder, idx) => {

        return (
            <div className ="cartOrderClass" key={idx}>   

            <h1>Thank you for your order!</h1>
            <h2>Your order number is: {currentCartOrder.id}</h2>
            

            </div>
        )}): <div>No order found.</div>

    )
    
};

export default Confirmation; 
