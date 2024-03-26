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
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "60m" });

            const refreshToken = jwt.sign({
                name: user.name,
                id: user._id
            }, process.env.REFRESH_TOKEN_SECRET);
            return {accessToken, refreshToken}

        } return "Contraseña incorrecta"

    } return "Usuario no encontrado"
    

} 


 const refreshToken = async (body) => {

    try {
      const { refreshToken } = body;

      if (!refreshToken) {
        return res.status(400).json({ message: "El token de refresco es requerido." });
      }

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token de refresco inválido." });
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });

        return res.status(200).json({
          message: "Token de acceso refrescado.",
          accessToken,
        });
        
      });
    } catch (error) {
      return res.status(500).json({ message: "Error al refrescar token de acceso. Por favor, inténtalo de nuevo más tarde." });
    }
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
    getUserByEmail,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    login,
    refreshToken

} 