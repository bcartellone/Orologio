import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SingleProduct = ({token, isLoggedIn, setIsLoggedIn, isAdmin}) => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [singleProduct, setSingleProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [name, setName] = useState(singleProduct.name)
    const [price, setPrice] = useState(singleProduct.price)
    const [description, setDescription] = useState(singleProduct.description)
    const [image, setImage] = useState(singleProduct.image)

    const fetchSingleProduct = async () => {
        try {
            const response = await fetch(`/api/products/${id}`)
            const data = await response.json();
            console.log("this is the response:", data)
            setSingleProduct(data)
           console.log("token:", token)
        } catch (error) {
            console.log(error)
        }
    };
    
    useEffect(() => {
        fetchSingleProduct();
    }, []);

    const handleSubmit = async () => {
        try {
            console.log('this is the quantitiy', quantity)
            if (isLoggedIn) {
            const response = await fetch(`/api/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                
                },
                body: JSON.stringify({
                        productId: singleProduct.id,
                        quantity: quantity
                })
            })
            const data = await response.json();
        } else {
            console.log('this is the quantity', quantity)
            const response = await fetch(`/api/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                        productId: singleProduct.id,
                        quantity: quantity
                })
            })
            const data = await response.json();
        }
        
            
        // console.log("this is the response:", data)
            
        } catch (error) {
            console.log(error)
        }
    } 
    
    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products/${singleProduct.id}`, {
                method: 'PATCH',
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
            fetchSingleProduct()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/products/${singleProduct.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/shop')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            {
                isAdmin ? <><form onSubmit={handleForm}>
                <input type="text" placeholder="name" value={name} onChange=
                {(e) => setName(e.target.value)}></input> 
                <input type="text" placeholder="price" value={price} onChange=
                {(e) => setPrice(e.target.value)}></input>
                <input type="text" placeholder="description" value={description} onChange=
                {(e) => setDescription(e.target.value)}></input> 
                <input type="text" placeholder="image" value={image} onChange=
                {(e) => setImage(e.target.value)}></input>
                <button type="submit">Edit Product</button>
            </form>
            <button onClick={handleDelete}>Delete Product</button>
            </> : null
            }
            <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                    <img src={singleProduct.image} alt={singleProduct.description} ></img>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                    <h1 style={{ textAlign: 'center'}}>{singleProduct.name}</h1>
                    <p style={{ textAlign: 'center'}}>{singleProduct.description}</p>
                </div>
                <div style={{ border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
                    <h1>${singleProduct.price}</h1>
                    <select value={quantity} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <button onClick={handleSubmit}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
};

export default SingleProduct; 

