import React, { useState, } from 'react';

import './Login.css';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit=async(event) => {
    event.preventDefault();
   
       
            try {
                const response = await fetch('/api/login', {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    user: {username: username,
                    password: password}

                })

                });
                

                const data = await response.json();

                console.log(data);
                    username(data);
                    password(data);
                } catch (error) {
                    console.error(error);
            }
        
    };

   
        
    

    return (
        <div className='login-body'>
            <div>
                <h1>User Login</h1>
            </div>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type="text" placeholder="username" value={username} onChange=
                {(e) => setUsername(e.target.value)}></input>
                <input type="text" placeholder="password" value={password} onChange=
                {(e) => setPassword(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )


      
      
      
      
      
      
      
      
      
      
      
      
      
}

export default Login; 




