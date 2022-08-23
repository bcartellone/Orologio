import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Checkout.css"

const Checkout = ({total}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [cartNum, setCardNum] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [name, setName] = useState('');
    

    const confirmation = async () => {
       let token = localStorage.getItem('token')
       if (token) {
            const response = await fetch('/api/cart_orders', {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`   
                },
            })
        }
    }

    return (
        <div>
            <form className='pay-container'>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Card Information</label>
                <input type="text" value={cartNum} onChange={(e) => setCardNum(e.target.value)}
                placeholder="1234 1234 1234 1234"></input>
                <input type="text" value={cardDate} onChange={(e) => setCardDate(e.target.value)}
                placeholder="MM/YY"></input>
                <input type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)}
                placeholder="CVC"></input>
                <label>Name on card</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button onClick={() => {confirmation();alert('Thank you for your purchase');navigate('/')}}>Pay ${total}</button>
            </form>
        </div>
    )
};


export default Checkout; 