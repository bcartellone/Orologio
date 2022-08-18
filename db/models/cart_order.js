const client = require("../client")

async function createCartOrder({ orderStatus, userId }) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO cart_order("orderStatus", "userId")
            VALUES ($1, $2)
            RETURNING *;
        `, [orderStatus, userId])
        return order;
    } catch (error) {
        throw error
    }
}

async function destroyCartOrder(id) {
    try {
        await client.query(`
            DELETE FROM cart_items
            WHERE "orderId"=($1)
            RETURNING *;
        `, [id]);
        await client.query(`
            DELETE FROM cart_order
            WHERE id=($1)
            RETURNING *;
        `, [id]);
        return 'destroyed cart order'
    } catch (error) {
        throw error
    }
}
module.exports = {
    createCartOrder, destroyCartOrder
}