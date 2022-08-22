const client = require("../client")

async function createRole(name) {
    try {
        const { rows: [role] } = await client.query(`
            INSERT INTO role(name)
            VALUES ($1)
            RETURNING *;
        `, [name])
        return role;
    } catch (error) {
        throw error
    }
}

async function getRoleById(id) {
    if (!id) {
        return;
    }
    try {
        const { rows: [role] } = await client.query(`
            SELECT *
            FROM role
            WHERE id=$1
        `, [id]);
        return role
    } catch (error) {
        throw error
    }
}
module.exports = {
    createRole, getRoleById
}