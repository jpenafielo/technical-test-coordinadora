const db = require('../database/mysql')

const getAllEvents = (callback) => { 

    db.query('SELECT * FROM events', (error, results, fields) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });

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