const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/eventsController')
const authToken = require("../utils/authToken")
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/**
 * @swagger
 * /api/events/:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene todos los eventos
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get("/", authToken, eventsController.getAllEvents)

/**
 * @swagger
 * /api/events/{eventId}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene un evento especifico
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del evento
 */
router.get("/:eventId", authToken, eventsController.getEvent)

/**
 * @swagger
 * /api/events/nearLocations:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Retorna las puntos cercanos a unas coordenadas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lon:
 *                 type: float
 *                 description: La longitud del punto
 *               lat:
 *                 type: float
 *                 format: date-time
 *                 description: La latitud del punto
 *               range:
 *                 type: int
 *                 format: date-time
 *                 description: El rango deseado
 *           example:
 *             lon: -74.1070667
 *             lat: 4.5980621
 *             range: 1000
 *     responses:
 *       200:
 *         description: Lista de puntos cercanos
 */
router.post("/nearLocations", authToken, eventsController.getNearLocations)

/**
 * @swagger
 * /api/events/nearLocationsFromEvent:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Retorna las puntos cercanos a un evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: float
 *                 description: El id del evento
 *               range:
 *                 type: int
 *                 format: date-time
 *                 description: El rango deseado
 *           example:
 *             eventId: 76
 *             range: 1000
 *     responses:
 *       200:
 *         description: Lista de puntos cercanos
 */
router.post("/nearLocationsFromEvent", authToken, eventsController.getNearLocationsFromEvent)

/**
 * @swagger
 * /api/events/upload:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Creacion de eventos a partir de un excel
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: El archivo excel con la informacion de los eventos
 *     responses:
 *       200:
 *         description: Archivo Excel procesado correctamente
 */
router.post("/upload", authToken, upload.single('file'),  eventsController.massiveCreationEvents)


/**
 * @swagger
 * /api/events/:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Registra un evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El ID del usuario
 *               name:
 *                 type: string
 *                 format: date-time
 *                 description: El nombre del evento
 *               description:
 *                 type: string
 *                 format: date-time
 *                 description: Descripcion del evento
 *               location:
 *                 type: string
 *                 format: date-time
 *                 description: Direccion del evento
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha del evento
 *           example:
 *             email: "prueba@test.com"
 *             name: "prueba10" 
 *             description: "Evento de prueba"
 *             location: "Ave Cra 30 #45-3, Bogotá"
 *             date: "2024-06-23"
 *     responses:
 *       200:
 *         description: Evento registrado
 */
router.post("/", authToken, eventsController.createEvent)


/**
 * @swagger
 * /api/events/{eventId}:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: Actualiza un evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El ID del usuario
 *               name:
 *                 type: string
 *                 format: date-time
 *                 description: El nombre del evento
 *               description:
 *                 type: string
 *                 format: date-time
 *                 description: Descripcion del evento
 *               location:
 *                 type: string
 *                 format: date-time
 *                 description: Direccion del evento
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha del evento
 *           example:
 *             email: "prueba@test.com"
 *             name: "prueba10" 
 *             description: "Evento de prueba"
 *             location: "Ave Cra 30 #45-3, Bogotá"
 *             date: "2024-06-23"
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 * 
 *     responses:
 *       200:
 *         description: Evento actualizado
 */
router.put("/:eventId", authToken, eventsController.updateEvent)



/**
 * @swagger
 * /api/events/{eventId}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: Elimina un evento específico
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado
 */
router.delete("/:eventId", authToken, eventsController.deleteEvent);


module.exports = router;