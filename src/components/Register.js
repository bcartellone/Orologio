import React, { useState, useEffect } from 'react';

import './Register.css';

const Register = () => {

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
        <div className="registration">
            {
            <h2> {
                register.length ? register.map((register, idx) => {
                    console.log(register);
                return <div key={idx}>
                        <div className ="register requirements">   
                            <p>{register.username}</p>
                            <p>{register.password}</p>
                            <p>{register.roleID}</p>
                        </div> 
                        
                    </div>
                    }) : <p> nothing here</p>
                }
            </h2>    
                
            }

        </div>
    )
}

export default Register; 

