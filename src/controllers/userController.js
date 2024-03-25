const services = require('../services/userServices')


const getAllUsers = async (req,res) => {
    
    try{
        const result = await services.getAllUsers();
        res.json(result)
    } catch (error){
        res.status(500);
        res.send(error.message)
    }

}

const getUser = async (req,res) => {

    try{
        const { userId } = req.params
        const result = await services.getUser(userId);
        res.json(result)
    } catch (error){
        res.status(500);
        res.send(error.message)
    }
   
}

const createUser = (req,res) => {

    try {
        services.createUser(req.body)
        res.send( { status: 'OK', data: req.body})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    
}

const updateUser =  (req,res) => {

    const response =  services.updateUser(req.params.userId, req.body)

    res.send( { status: 'OK', data: req.body})
}

const deleteUser = (req,res) => {
    try {
        services.deleteUser(req.params.userId)
        res.send( { status: 'OK', data: "Usuario eliminado exitosamente"})

      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }
}


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}