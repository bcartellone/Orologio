import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Cart.css';

const Cart = ({cart, setCart, isLoggedIn, setIsLoggedIn, token, setToken, total, setTotal}) => {
    const navigate = useNavigate()

    const fetchCart = async () => {
        try {
            if (!isLoggedIn) {
            const response = await fetch('/api/cart_items');
            const data = await response.json();
            console.log('fsfsdfsdfs', data);
            setCart(data);
            let sum = 0;
            data.forEach((item) => {
                sum += Number(item.product.price)
            })
            setTotal(sum)
            } else {
                const response = await fetch('/api/cart_items', {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`   
                    }
                }
            );
                const data = await response.json();
                console.log(data);
                setCart(data);
                let sum = 0;
                data.forEach((item) => {
                    sum += Number(item.product.price)
                })
                setTotal(sum)
            }
            } catch (error) {
                console.error(error);
            }
    
    };

    useEffect(() => {
        fetchCart();
    }, []);

    function order () {
        if (isLoggedIn) {
         navigate('/Checkout')
        } else {
            alert("Please login or register for an account to checkout")
        }
     }

     const deleteHandler = async (e) => {
        try {
            if (isLoggedIn) {
                const response = await fetch(`/api/cart_items/${e.target.value}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                fetchCart()
            } else {
                const response = await fetch(`/api/cart_items/${e.target.value}`, {
                    method: 'DELETE',
                })
                fetchCart()
            }
        } catch (error) {
            
        }
     }

    return (
        <div className='cart' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{flex: 2, border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>Shopping Cart</h1>
                {
                cart.length ? cart.map((currentItem, idx) => {
                    console.log("current item:", cart);
                return (
                    <div style={{ padding: '5px', border: '1px solid black', display: 'flex', justifyContent: 'space-evenly'}}>
                        <div>
                            <img src={currentItem.product.image} alt={currentItem.product.description} ></img>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                            <h1 style={{ textAlign: 'center'}}>{currentItem.product.name}</h1>
                            <p style={{ textAlign: 'center'}}>{currentItem.product.description}</p>
                        </div>
                        <div style={{ border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                            <h1>${currentItem.product.price}</h1>
                            <button value={currentItem.itemId} onClick={deleteHandler}>DELETE</button>
                        </div>
                    </div>
                    )}) : <h1>Cart Is Empty</h1>
                }
            </div>
            <div style={{border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                <h1>Subtotal ({cart.length}): ${total}</h1>
                <button onClick={order}>Proceed to checkout</button>
            </div>
        </div>
    )
};


export default Cart; 