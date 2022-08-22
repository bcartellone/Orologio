// import React from 'react';
// import ReactDOM from 'react-dom';
// import { App } from './components';

// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Header, Shop, Home, Cart, About, Register, Login, SingleProduct, Checkout, Confirmation } from './components';

const App = () => {
    const [cart, setCart] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Routes>
                <Route path={'/'}>
                    <Route index element={<Home/>}/>
                    <Route path={'Shop'} element={<Shop/>}/>
                    <Route path={'Shop/:id'} element={<SingleProduct token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    {/* <Route path={'Cart'} element={<Cart cart={cart} setCart={setCart}/>}/> */}
                    <Route path={'Cart'} element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>}/>
                    <Route path={'About'} element={<About/>}/>
                    <Route path={'Register'} element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>}/>
                    <Route path={'Login'} element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>}/>
                    <Route path={'Checkout'} element={<Checkout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>}/>
                    {/* <Route path={'Checkout'} element={<Checkout/>}/> */}
                    <Route path={'Confirmation'} element={<Confirmation/>}/>
                </Route>
            </Routes>   
        </>
       
    

    ) 
    };



let appElement = document.getElementById('app');
ReactDOM.render( <BrowserRouter><App /></BrowserRouter>, appElement);

// ReactDOM.render(<App />, document.getElementById('root'));
