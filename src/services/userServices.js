const { getConnection } = require('../database/mysql')

const getAllUsers = async() => { 

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM users');
    return result

} 

const getUser = async (userId) => {

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    return result
  };

const createUser = async (user) => { 

    const sql = `INSERT INTO users SET ?`;
    const connection = await getConnection();
    connection.query(sql, user)
    console.log("Usuario creado exitosamente USER:", user)

} 

const updateUser = async (userId, user) => { 

    const sql = `UPDATE users SET ? WHERE user_id = ?`;
    const connection = await getConnection();
    connection.query(sql, [user, userId])
    console.log("Usuario actualizado exitosamente ID:", userId)

} 
const deleteUser =  async (userId) => { 
    const sql = `DELETE FROM users WHERE user_id = ?`;
    const connection = await getConnection();
    connection.query(sql, userId)
    console.log("Usuario eliminado exitosamente, ID:", userId)
}

module.exports = {

    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser

} 