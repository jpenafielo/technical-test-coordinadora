const { getConnection } = require('../database/mysql')

const getAllEvents = async () => { 

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM events');
    return result

} 
const getEvent = async (eventId) => {

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
    return result
}
const createEvent = async (event) => { 

    const sql = `INSERT INTO events SET ?`;
    const connection = await getConnection();
    connection.query(sql, event)
    console.log("Evento creado exitosamente USER:", event)

} 
const updateEvent = async (eventId, event) => { 

    const sql = `UPDATE events SET ? WHERE event_id = ?`;
    const connection = await getConnection();
    connection.query(sql, [event, eventId])
    console.log("Evento actualizado exitosamente ID:", eventId)

} 
const deleteEvent =  async (eventId) => { 
    const sql = `DELETE FROM events WHERE event_id = ?`;
    const connection = await getConnection();
    connection.query(sql, eventId)
    console.log("Evento eliminado exitosamente, ID:", eventId)
}

module.exports = {

    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent

}