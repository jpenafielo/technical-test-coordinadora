const services = require('../services/eventsServices')

const getAllEvents = async (req,res) => {
    
    try{
        const result = await services.getAllEvents();
        res.json(result)
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getEvent = (req,res) => {
    const event = services.getEvent(req.params.eventId)
    res.send( { status: 'OK', data: event})
}

const createEvent = (req,res) => {
    const response = services.createEvent(req.params.eventId)
    res.send( { status: 'OK', data: response})
}

const updateEvent = (req,res) => {
    const response = services.updateEvent(req.params.eventId)
    res.send( { status: 'OK', data: response})
}

const deleteEvent = (req,res) => {
    const response = services.deleteEvent(req.params.eventId)
    res.send( { status: 'OK', data: response})
}


module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}