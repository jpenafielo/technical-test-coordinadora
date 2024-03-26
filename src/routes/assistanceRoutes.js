const express = require("express");
const router = express.Router();
const assistanceController = require('../controllers/assistanceController')
const authToken = require("../utils/authToken")

router
    .get("/", authToken, assistanceController.getAllAssistance)
    .get("/:assistanceId", authToken, assistanceController.getAssistance)
    .get("/user/:userId", authToken, assistanceController.getUserAssistance)
    .get("/event/:eventId", authToken, assistanceController.getEventAssistance)
    .post("/", authToken, assistanceController.registerAssistance)
    .put("/:assistanceId", authToken, assistanceController.updateAssistance)
    .delete("/:assistanceId", authToken, assistanceController.deleteAssistance);
    
module.exports = router;