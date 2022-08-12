// import React from 'react';
// import ReactDOM from 'react-dom';
// import { App } from './components';

// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Header, Shop, Login, Home, Register, Cart, About } from './components';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path={'/'}>
                    <Route index element={<Home/>}/>
                    <Route path={'Shop'} element={<Shop/>}/>
                    <Route path={'Login'} element={<Login/>}/>
                    <Route path={'Register'} element={<Register/>}/>
                    <Route path={'Cart'} element={<Cart/>}/>
                    <Route path={'About'} element={<About/>}/>
                </Route>
            </Routes>   
        </>
       
    

    ) 
    };



let appElement = document.getElementById('app');
ReactDOM.render( <BrowserRouter><App /></BrowserRouter>, appElement);

// ReactDOM.render(<App />, document.getElementById('root'));
