const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/eventsController')
const authToken = require("../utils/authToken")

router
    .get("/", authToken, eventsController.getAllEvents)
    .get("/:eventId", authToken, eventsController.getEvent)
    .post("/", authToken, eventsController.createEvent)
    .put("/:eventId", authToken, eventsController.updateEvent)
    .delete("/:eventId", authToken, eventsController.deleteEvent);


module.exports = router;