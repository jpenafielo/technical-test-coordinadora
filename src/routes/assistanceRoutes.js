const express = require("express");
const router = express.Router();
const assistanceController = require('../controllers/assistanceController')
const authToken = require("../utils/authToken")


/**
 * @swagger
 * /api/assistance:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene todas las asistencias
 *     responses:
 *       200:
 *         description: Lista de asistencias
 */
router.get("/", authToken, assistanceController.getAllAssistance)

/**
 * @swagger
 * /api/assistance/dailyAssistance:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene la asistencia diaria
 *     responses:
 *       200:
 *         description: Asistencia diaria
 */
router.get("/dailyAssistance", authToken, assistanceController.getDailyAssistance)

/**
 * @swagger
 * /api/assistance/{assistanceId}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene una asistencia específica
 *     parameters:
 *       - in: path
 *         name: assistanceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asistencia específica
 */
router.get("/:assistanceId", authToken, assistanceController.getAssistance)

/**
 * @swagger
 * /api/assistance/user/{userId}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene la asistencia de un usuario específico
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asistencia del usuario
 */
router.get("/user/:userId", authToken, assistanceController.getUserAssistance)

/**
 * @swagger
 * /api/assistance/event/{eventId}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene la asistencia de un evento específico
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asistencia del evento
 */
router.get("/event/:eventId", authToken, assistanceController.getEventAssistance)

/**
 * @swagger
 * /api/assistance/:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Registra una asistencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: int
 *                 description: El ID del usuario
 *               userId:
 *                 type: int
 *                 format: date-time
 *                 description: La fecha de la asistencia
 *               date:
 *                 type: date
 *                 format: date-time
 *                 description: La fecha de la asistencia
 *           example:
 *             eventId: 60
 *             userId: 16 
 *             date: 2024-03-26
 *     responses:
 *       200:
 *         description: Asistencia registrada
 */

router.post("/", authToken, assistanceController.registerAssistance)

/**
 * @swagger
 * /api/assistance/{assistanceId}:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: Actualiza una asistencia específica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: int
 *                 description: El ID del usuario
 *               userId:
 *                 type: int
 *                 format: date-time
 *                 description: La fecha de la asistencia
 *               date:
 *                 type: date
 *                 format: date-time
 *                 description: La fecha de la asistencia
 *           example:
 *             eventId: 60
 *             userId: 16 
 *             date: 2024-03-26
 *     parameters:
 *       - in: path
 *         name: assistanceId
 *         required: true
 *         schema:
 *           type: string
 * 
 *     responses:
 *       200:
 *         description: Asistencia actualizada
 */
router.put("/:assistanceId", authToken, assistanceController.updateAssistance)

/**
 * @swagger
 * /api/assistance/{assistanceId}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: Elimina una asistencia específica
 *     parameters:
 *       - in: path
 *         name: assistanceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asistencia eliminada
 */
router.delete("/:assistanceId", authToken, assistanceController.deleteAssistance);
    
module.exports = router;
