const { getConnection } = require('../database/mysql')
const bcrypt = require('../utils/handleBcrypt')
const jwt = require('jsonwebtoken');

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


const getUserByEmail = async (email) => {

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return result
};

const registerUser = async (user) => { 

    const {email, password, name} = user;

    const date = Date.now();
    const date_time = new Date(date)

    const userRegistered = {
        email,
        password: await bcrypt.encrypt(password),
        name,
        registration_date: date_time
    }

    const sql = `INSERT INTO users SET ?`;
    const connection = await getConnection();
    connection.query(sql, userRegistered)
    return userRegistered

} 


const login = async (user) => { 

    const {email, password} = user;

    const databaseUser = await getUserByEmail(email)

    if (databaseUser){

        const validPassword = bcrypt.compare(password, databaseUser[0].password)
        
        if (validPassword){

            const accessToken = jwt.sign({
                name: user.name,
                id: user._id
            }, process.env.TOKEN_SECRET, {expiresIn: "60m" });

            const refreshToken = jwt.sign({
                name: user.name,
                id: user._id
            }, process.env.TOKEN_SECRET);
            return {accessToken, refreshToken}

        } return "Contraseña incorrecta"

    } return "Usuario no encontrado"
    

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
    registerUser,
    updateUser,
    deleteUser,
    login

} 