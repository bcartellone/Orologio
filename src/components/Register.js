import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Cart.css';

const Register = ({setIsLoggedIn}) => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                        username: username,
                        password: password,
                        roleId: 1
                })
            })
            console.log(response);
            const data = await response.json();
            console.log('data:', data.token);
            if (data.token) {
                navigate('/');
                setIsLoggedIn(true)
            }
            // console.log('token:', data.token);
            // if (data.token) {
            //     setIsLoggedIn(true)
            // }
            // setToken(data.token);
           
            // console.log("this is the new token", token)
            // history.push('/')
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <div>
                <h1>User Registration</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" value={username} onChange=
                {(e) => setUsername(e.target.value)}></input> 
                <input type="text" placeholder="password" value={password} onChange=
                {(e) => setPassword(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};


export default Register; 