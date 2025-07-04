const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");

// Routes for event actions
router.post("/add", authorizeUser, eventController.addEvent);
router.get("/all", eventController.allEvents);
router.get("/my", authorizeUser, eventController.getMyEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
