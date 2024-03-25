const services = require('../services/assistanceServices')

const getAllAssistance = async (req,res) => {
    
    try{
        const result = await services.getAllAssistance();
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getAssistance = async (req,res) => {
    
    try{
        const { assistanceId } = req.params
        const result = await services.getAssistance(assistanceId);
        res.send( { status: 'OK', data: result})
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getEventAssistance = async (req,res) => {
    
  try{
      const { eventId } = req.params
      const result = await services.getEventAssistance(eventId);
      res.send( { status: 'OK', data: result})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }

}

const getUserAssistance = async (req,res) => {
    
  try{
      const { userId } = req.params
      const result = await services.getUserAssistance(userId);
      res.send( { status: 'OK', data: result})
  } catch (error){
      res.status(500);
      res.send(error.message)
  }

}

const registerAssistance = (req,res) => {

    try {

        const { assistance } = req.body
        services.createEvent(assistance)
        res.send( { status: 'OK', data: assistance})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const updateAssistance = (req,res) => {

    try {

        const { assistanceId } = req.params
        const { assistance } = req.body
        services.updateEvent(assistanceId, assistance)
        res.send( { status: 'OK', data: assistance})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

const deleteAssistance = (req,res) => {

     try {

        const { assistanceId } = req.params
        services.deleteEvent(assistanceId)
        res.send( { status: 'OK', data: "Asistencia eliminada exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}


module.exports = {
  getAllAssistance,
  getAssistance,
  getEventAssistance,
  getUserAssistance,
  registerAssistance,
  updateAssistance,
  deleteAssistance
  
}