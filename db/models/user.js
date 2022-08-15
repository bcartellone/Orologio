// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");


async function getAllUsers(){
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM users;
    `);
    
    
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password, roleId }){
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user]}  = await client.query( `
    INSERT INTO users(username, password, "roleId")
    VALUES($1, $2, $3)
    ON CONFLICT(username) DO NOTHING
    RETURNING username, id;
    `, [username, hashedPassword, roleId]);
    return user;
  } catch (error){
    throw error
  }
}

async function getUserByUsername(username) {
  if (!username) {
    return;
  }
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users 
    WHERE username=$1;
    `, [username])
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserByUsername
};