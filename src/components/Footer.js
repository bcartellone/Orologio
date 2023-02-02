import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

import './Footer.css';
import fbicon from './1. logofbicon.png';
import twiticon from './1. logotwiticon.png';
import instaicon from './1. logoinstaicon.png';

const Footer = ({isLoggedIn, setIsLoggedIn, subTotal, setToken, setIsAdmin, isAdmin}) => {
    const navigate = useNavigate();

    useEffect (() => {
        if (localStorage.getItem('token')) {
                setIsLoggedIn(true)
                setToken(localStorage.getItem('token'))
        }
        if (localStorage.getItem('isAdmin')) {
                setIsAdmin(true)
        }
    }, [])

    function logoutHandle () {
        setIsLoggedIn(false);
        setToken('')
        setIsAdmin(false)
        localStorage.clear()
        navigate('/')
    }
    return (
        
            <div className='footerMain'>
                <div className='socialImages'> 
                    <img src={fbicon} alt='facebook logo'/>  
                    <img src={twiticon} alt='twitter logo'/>  
                    <img src={instaicon} alt='instagram logo'/>  
                </div>
                <div className='copyright'>
                        <p>Copyright 2022</p>
                </div>
            </div>
            
            
       
    )
};

export default Footer; 