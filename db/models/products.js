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

async function createProduct({brand,name,description,price,image}){
    try{
    const {rows: [product]} = await client.query(`
        INSERT INTO products(brand,name,description,price,image)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;

    `,[brand,name,description,price,image])
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

async function updateProduct({ id, brand, name, description, price, image }) {
    try {
        const { rows: [product] } = await client.query(`
        UPDATE products
        SET brand=$1, name=$2, description=$3, price=$4, image=$5
        WHERE id=${id}
        RETURNING *;
        `, [brand, name, description, price, image])

        return product
    } catch (error) {
        throw error;
    }
}

module.exports = {
getAllProducts, createProduct, getProductById, deleteProduct, updateProduct
}