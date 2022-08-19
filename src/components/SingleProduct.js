import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
    const { id } = useParams();

    const [singleProduct, setSingleProduct] = useState({})

    useEffect(() => {
    const fetchSingleProduct = async () => {
        try {
            const response = await fetch(`/api/products/${id}`)
            const data = await response.json();
            console.log("this is the response:", data)
            setSingleProduct(data)
           
        } catch (error) {
            console.log(error)
        }
    };
    fetchSingleProduct();
    }, []);

    // const handleSubmit = async () => {
    //     try {
    //         const response = await fetch(`/api/cart_items/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                     username: username,
    //                     password: password,
    //                     roleId: 1
    //             })
    //         })
    //         const data = await response.json();
    //         console.log("this is the response:", data)
            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return (
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
                {/* <button onClick={handleSubmit}>Add to Cart</button> */}
            </div>
        </div>
    )
};

export default SingleProduct; 

