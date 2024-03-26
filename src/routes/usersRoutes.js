const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController')
const authToken = require("../utils/authToken")

/**
 * @swagger
 * /api/users/:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", authToken,  usersController.getAllUsers)

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Obtiene un usuario especifico
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del usuario
 */
router.get("/:userId", authToken, usersController.getUser)

/**
 * @swagger
 * /api/users/:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Registra un usuario
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
 *                 description: La fecha de la asistencia
 *               password:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha de la asistencia
 *           example:
 *             email: "prueba@test.com"
 *             name: "prueba10" 
 *             password: "pruebacontrasena"
 *     responses:
 *       200:
 *         description: Usuario registrado
 */
router.post("/", usersController.registerUser)

/**
 * @swagger
 * /api/users/auth/login:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Logea a un usuario
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
 *                 description: La fecha de la asistencia
 *               password:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha de la asistencia
 *           example:
 *             email: "prueba@test.com"
 *             name: "prueba10" 
 *             password: "pruebacontrasena"
 *     responses:
 *       200:
 *         description: Usuario logeado
 */
router.post("/auth/login", usersController.login)


/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     security:
 *       - Bearer: []
 *     summary: Actualiza una usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: String
 *                 description: El correo del usuario
 *               name:
 *                 type: string
 *                 format: date-time
 *                 description: El nombre del usuario
 *               password:
 *                 type: string
 *                 format: date-time
 *                 description: La contraseña del usuario
 *           example:
 *             email: "prueba@test.com"
 *             name: "prueba10" 
 *             password: "pruebacontrasena"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 * 
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/:userId", authToken, usersController.updateUser)

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: Elimina un usuario específico
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete("/:userId", authToken, usersController.deleteUser);

module.exports = router;
