const { getConnection } = require('../database/mysql')
const eventService = require("./eventsServices")
const moment = require('moment');

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

    const assistanceToRegister = {
        event_id: assistance.eventId,
        user_id: assistance.userId,
        date: assistance.date
    }

    const event = (await eventService.getEvent(assistance.eventId))[0]

    if (event){
        const eventToUpdate = {
            event_id: event.event_id,
            user_id: event.user_id,
            name: event.name,
            description: event.description,
            created_date: event.created_date,
            location: event.location,
            assistance: event.assistance + 1 ,
            date: event.date
        }
    
        eventService.updateEvent(event.event_id, eventToUpdate)
        
        const sql = `INSERT INTO assistance SET ?`;
        const connection = await getConnection();
        connection.query(sql, assistanceToRegister)
        return {message: "Asistencia registrada exitosamente Asistencia:", data: assistance}
    }
    else {
        
        return {message: "El evento no existe"}
    }
    

} 

const updateAssistance = async (assistanceId, assistance) => { 

    const assistanceToRegister ={
        event_id: assistance.eventId,
        user_id: assistance.userId,
        date: assistance.date
    }
    const sql = `UPDATE assistance SET ? WHERE assistance_id = ?`;
    const connection = await getConnection();
    connection.query(sql, [assistanceToRegister, assistanceId])
    console.log("Asistencia actualizada exitosamente ID:", assistanceId)
} 
const deleteAssistance =  async (assistanceId) => { 
    const sql = `DELETE FROM assistance WHERE assistance_id = ?`;
    const connection = await getConnection();
    connection.query(sql, assistanceId)
    console.log("Asistencia eliminada exitosamente, ID:", assistanceId)
}


const calculateDailyAssistance = async (events) => {

    let dailyAssistance = {
        'Sunday': 0,
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0
    };

    events.forEach(event => {
        let day = moment(event.date).format('dddd');
        dailyAssistance[day] += event.assistance;
    });

    return dailyAssistance
}

module.exports = {

    getAllAssistance,
    getEventAssistance,
    getAssistance,
    getUserAssistance,
    registerAssistance,
    updateAssistance,
    deleteAssistance,
    calculateDailyAssistance

} 