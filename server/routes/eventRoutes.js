const express = require("express");
const router = express.Router();
const eveneController = require("../controllers/eventController");

router.post("/add", eveneController.addEvent);

module.exports = router;
