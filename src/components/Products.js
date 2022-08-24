import React, { useState, useEffect } from 'react';

import './Products.css';

const Products = ({isAdmin, token}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                        name,
                        price,
                        description,
                        image
                })
            })
            console.log(response);
            const data = await response.json();
            console.log('data: fsdfsdfsfsfs', data);
            
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <div>
        {
            isAdmin ? 
            <>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="name" value={name} onChange=
                    {(e) => setName(e.target.value)}></input> 
                    <input type="text" placeholder="price" value={price} onChange=
                    {(e) => setPrice(e.target.value)}></input>
                    <input type="text" placeholder="description" value={description} onChange=
                    {(e) => setDescription(e.target.value)}></input> 
                    <input type="text" placeholder="image" value={image} onChange=
                    {(e) => setImage(e.target.value)}></input>
                    <button type="submit">Create Product</button>
                </form>
            </>: <h1>User must have admin privelages to access this feature</h1>
        }
        </div>
    )
    
};

export default Products; 
