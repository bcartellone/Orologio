import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    return (
        
            <div className='headerMain'>
                <div className="homeFlexContainer">
                        <div className='navToolsTopLeft'>
                                <a className='registerLink' onClick={()=> navigate('/Register')} >REGISTER</a>

                                <a className='loginLink' onClick={()=> navigate('/Login')} >LOGIN</a>

                        </div>

                        <div className='navToolsTopRight'>  

                                <a onClick={()=> navigate('/Cart')} >CART ({0})</a>

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