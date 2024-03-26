const express = require("express");
const router = express.Router();
const eventsController = require('../controllers/eventsController')
const authToken = require("../utils/authToken")
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router
    .get("/", authToken, eventsController.getAllEvents)
    .get("/:eventId", authToken, eventsController.getEvent)
    .post("/nearLocations", authToken, eventsController.getNearLocations)
    .post("/nearLocationsFromEvent", authToken, eventsController.getNearLocationsFromEvent)
    .post("/upload", authToken, upload.single('file'),  eventsController.massiveCreationEvents)
    .post("/", authToken, eventsController.createEvent)
    .put("/:eventId", authToken, eventsController.updateEvent)
    .delete("/:eventId", authToken, eventsController.deleteEvent);


module.exports = router;