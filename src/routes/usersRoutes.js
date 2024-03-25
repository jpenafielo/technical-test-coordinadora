const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController')


router
    .get("/", usersController.getAllUsers)
    .get("/:userId", usersController.getUser)
    .post("/", usersController.createUser)
    .put("/:userId", usersController.updateUser)
    .delete("/:userId", usersController.deleteUser);


module.exports = router;