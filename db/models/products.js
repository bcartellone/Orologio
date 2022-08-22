const client = require("../client")

async function getAllProducts() {
    try {
    const {rows} = await client.query(`
    SELECT * 
    FROM products;
    `);

    return rows;
    } catch (error) {
        throw error;   
    }
}

async function createProduct({name,description,price,image}){
    try{
    const {rows: [product]} = await client.query(`
        INSERT INTO products(name,description,price,image)
        VALUES($1,$2,$3,$4)
        RETURNING *;

    `,[name,description,price,image])
    return product;
    }
    catch (error){
        throw error;  }
}

async function getProductById(id) {
    if (!id) {
        return;
    }
    try {
        const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1
        `, [id]);
        return product
    } catch (error) {
        throw error
    }
}

async function deleteProduct(id) {
    try {
        const { rows: [removed] } = await client.query(`
        DELETE FROM products
        WHERE id=$1
        RETURNING *;
        `, [id]);

        return removed;
    } catch(error) {
        throw error;
    }
}

async function updateProduct({ id, name, description, price, image }) {
    try {
        const { rows: [product] } = await client.query(`
        UPDATE products
        SET name=$1, description=$2, price=$3, image=$4
        WHERE id=${id}
        RETURNING *;
        `, [name, description, price, image])

        return product
    } catch (error) {
        throw error;
    }
}

module.exports = {
getAllProducts, createProduct, getProductById, deleteProduct, updateProduct
}