import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    return (
        <body>
            <div className='navToolsMain'>
                <div className='navToolsTitle'>
                        <div className='navToolsSub'>
                        <h2 onClick={()=> navigate('/')} >Home</h2>

                        <h2 onClick={()=> navigate('/Shop')} >Shop</h2>

                        <h2 onClick={()=> navigate('/Register')} >Register</h2>

                        <h2 onClick={()=> navigate('/Login')} >Login</h2>
                        </div>    
                </div>
            </div>
        </body>
    )
};

export default Header; 