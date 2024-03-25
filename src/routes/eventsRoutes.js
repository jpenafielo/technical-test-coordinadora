const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/eventsController')


router
    .get("/", eventsController.getAllEvents)
    .get("/:eventId", eventsController.getEvent)
    .post("/", eventsController.createEvent)
    .put("/:eventId", eventsController.updateEvent)
    .delete("/:eventId", eventsController.deleteEvent);


module.exports = router;