const client = require("../client")

async function createCartItem({ productId, orderId, quantity }) {
    try {
        const { rows: [item] } = await client.query(`
            INSERT INTO cart_items("productId", "orderId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [productId, orderId, quantity])
        return item;
    } catch (error) {
        throw error
    }
}

async function deleteCartItem(id) {
    try {
        const { rows: [deletedItem]} = await client.query(`
            DELETE FROM cart_items
            WHERE id=($1)
            RETURNING *;
        `, [id]);
        return deletedItem
    } catch (error) {
        throw error
    }
}

async function getCartItemsByOrderId(orderId) {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM cart_items
        WHERE "orderId"=($1);
    `, [orderId])
        return rows
    } catch (error) {
      throw error;
    }
}
  
async function updateCartItemsById({id, productId, orderId, quantity}) {
    try {
        const { rows: [item] } = await client.query(`
        UPDATE cart_items
        SET "productId"=$1, "orderId"=$2, quantity=$3
        WHERE id=${id}
        RETURNING *;

    `, [productId, orderId, quantity])
    return item
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCartItem, deleteCartItem, getCartItemsByOrderId, updateCartItemsById
}