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

async function getOrderById(id) {
    try {
      const { rows: [ cart_order ] } = await client.query(`
        SELECT *
        FROM cart_order
        WHERE id=($1);
      `, [id])
  
      return cart_order;
    } catch (error) {
      console.log(error);
    }
  }

// async function getProductsByOrderId(id) {
//     try {
//         const { rows: [ cart_order ] } = await client.query(`
//         SELECT *
//         FROM products
//         WHERE orderId=($1);
//     `, [id])

//     } catch (error) {
//       console.log(error);
//     }
// }
  
  
module.exports = {
    createCartOrder, destroyCartOrder, getOrderById
}