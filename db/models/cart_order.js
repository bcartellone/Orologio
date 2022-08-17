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

module.exports = {
    createCartOrder,
}