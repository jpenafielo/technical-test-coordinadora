const express = require("express");
const router = express.Router();
const assistanceController = require('../controllers/assistanceController')


router
    .get("/", assistanceController.getAllAssistance)
    .get("/:assistanceId", assistanceController.getAssistance)
    .get("/user/:userId", assistanceController.getUserAssistance)
    .get("/event/:eventId", assistanceController.getEventAssistance)
    .post("/", assistanceController.registerAssistance)
    .put("/:assistanceId", assistanceController.updateAssistance)
    .delete("/:assistanceId", assistanceController.deleteAssistance);
    
module.exports = router;