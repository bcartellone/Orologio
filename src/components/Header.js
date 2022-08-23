import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

import './Header.css';

const Header = ({isLoggedIn, setIsLoggedIn, cart, setToken}) => {
    const navigate = useNavigate();

    useEffect (() => {
        if (localStorage.getItem('token')) {
                setIsLoggedIn(true)
                setToken(localStorage.getItem('token'))
        }
    }, [])

    function logoutHandle () {
        setIsLoggedIn(false);
        setToken('')
        localStorage.clear()
        navigate('/')
    }
    return (
        
            <div className='headerMain'>
                <div className="homeFlexContainer">
                        <div className='navToolsTopLeft'>
                                {
                                        isLoggedIn ? <a onClick={logoutHandle}>LOGOUT</a> : 
                                        <>
                                <a className='registerLink' onClick={()=> navigate('/Register')} >REGISTER</a>

                                <a className='loginLink' onClick={()=> navigate('/Login')} >LOGIN</a>
                                </>
                                }
                        </div>

                        <div className='navToolsTopRight'>  

                                <a onClick={()=> navigate('/Cart')} >CART ({cart.length})</a>

                        </div>
                </div>

                <div className='navToolsTitle'>
                        <h1>CYBORG FLYING WATCHES</h1>

                </div>     

                <div className='navToolsSub'>
                        <a onClick={()=> navigate('/')} >HOME</a>

                        <a onClick={()=> navigate('/Shop')} >SHOP</a>

                        <a onClick={()=> navigate('/About')} >ABOUT</a>

                        
                </div>    
            </div>
            
            
       
    )
};

export default Header; 