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

module.exports = {
    createRole,
}