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
    return (
        <div style={{ border: "1px solid black", boxShadow: "3px 3px gray", padding: "5px"}}>
            <p>Name: {singleProduct.name} </p>
            <p>Description: {singleProduct.description}</p>
            <p>Price: {singleProduct.price}</p>
        </div>
    )
};

export default SingleProduct; 