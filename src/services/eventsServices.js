const { getConnection } = require('../database/mysql')

const getAllEvents = async () => { 

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM events');
    return result

} 
const getEvent = (eventId) => {
    return eventId;
}
const createEvent = (eventId) => { 
    return eventId;
} 
const updateEvent = (eventId) => { 
    return eventId;
} 
const deleteEvent =  (eventId) => { 
    return eventId;
}

module.exports = {

    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent

}