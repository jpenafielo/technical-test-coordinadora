const { getConnection } = require('../database/mysql')


const getAllAssistance = async() => { 

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM assistance');
    return result

} 

const getEventAssistance = async (eventId) => {

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM assistance WHERE event_id = ?', [eventId]);
    return result

  };


const getAssistance = async (assistanceId) => {

const connection = await getConnection();
const result = await connection.query('SELECT * FROM assistance WHERE assistance_id = ?', [assistanceId]);
return result

};


const getUserAssistance = async (userId) => {

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM assistance WHERE user_id = ?', [userId]);
    return result
    
};

const registerAssistance = async (assistance) => { 

    const sql = `INSERT INTO assistance SET ?`;
    const connection = await getConnection();
    connection.query(sql, assistance)
    console.log("Asistencia registrada exitosamente Asistencia:", assistance)

} 

const updateAssistance = async (assistanceId, assistance) => { 

    const sql = `UPDATE assistance SET ? WHERE assistance_id = ?`;
    const connection = await getConnection();
    connection.query(sql, [assistance, assistanceId])
    console.log("Asistencia actualizada exitosamente ID:", assistanceId)

} 
const deleteAssistance =  async (assistanceId) => { 
    const sql = `DELETE FROM assistance WHERE assistance_id = ?`;
    const connection = await getConnection();
    connection.query(sql, assistanceId)
    console.log("Asistencia eliminada exitosamente, ID:", assistanceId)
}

module.exports = {

    getAllAssistance,
    getEventAssistance,
    getAssistance,
    getUserAssistance,
    registerAssistance,
    updateAssistance,
    deleteAssistance

} 