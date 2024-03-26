const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController')
const authToken = require("../utils/authToken")

/**
 * @openapi
 * /api/assistance:
 *   get:
 *     tags:
 *       - assistance
 *     responses:
 *       200:
 *         description: OK
 */
router
    .get("/", authToken,  usersController.getAllUsers)
    .get("/:userId", authToken, usersController.getUser)
    .post("/", usersController.registerUser)
    .post("/auth/login", usersController.login)
    .post("/refreshToken", usersController.refreshToken)
    .put("/:userId", authToken, usersController.updateUser)
    .delete("/:userId", authToken, usersController.deleteUser);



module.exports = router;