const services = require('../services/eventsServices')

const getAllEvents = async (req,res) => {
    
    try{
        const result = await services.getAllEvents();
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getEvent = async (req,res) => {
    
    try{
        const { eventId } = req.params
        const result = await services.getEvent(eventId);
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const createEvent = (req,res) => {

    try {

        const { event } = req.body
        services.createEvent(event)
        res.send( { status: 'OK', data: event})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const updateEvent = (req,res) => {

    try {

        const { eventId } = req.params
        const { event } = req.body
        services.updateEvent(eventId, event)
        res.send( { status: 'OK', data: event})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const deleteEvent = (req,res) => {

     try {

        const { eventId } = req.params
        services.deleteEvent(eventId)
        res.send( { status: 'OK', data: "Usuario eliminado exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}


module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}