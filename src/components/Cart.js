import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Cart.css';

const Cart = ({cart, setCart}) => {
    const navigate = useNavigate()
    useEffect(() => {
   
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/cart');
                const data = await response.json();

                console.log(data);
                setCart(data);
                } catch (error) {
                    console.error(error);
                }
        
        };
        fetchCart();
    }, []);

    function order () {
        navigate('/Checkout')
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{flex: 2, border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>Shopping Cart</h1>
                {
                cart.length ? cart.map((currentItem, idx) => {
                    console.log(currentItem);
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                        <div>
                            <img src={currentItem.image} alt={currentItem.description} ></img>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                            <h1 style={{ textAlign: 'center'}}>{currentItem.name}</h1>
                            <p style={{ textAlign: 'center'}}>{currentItem.description}</p>
                        </div>
                        <div style={{ border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                            <h1>${currentItem.price}</h1>
                        </div>
                    </div>
                    )}) : <h1>Cart Is Empty</h1>
                }
            </div>
            <div style={{border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>Subtotal (amount item): $price</h1>
                <button onClick={order}>Proceed to checkout</button>
            </div>
        </div>
    )
};


export default Cart; 