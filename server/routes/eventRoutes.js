const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");

router.post("/add", authorizeAdmin, eventController.addEvent);
router.get("/all", authorizeUser, eventController.allEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
