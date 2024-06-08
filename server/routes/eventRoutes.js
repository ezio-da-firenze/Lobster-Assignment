const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");

router.post("/add", authorizeAdmin, eventController.addEvent);
router.get("/all", eventController.allEvents);

module.exports = router;
