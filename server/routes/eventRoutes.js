const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post(
    "/add",
    authorizeUser,
    upload.single("thumbnail"),
    eventController.addEvent
);
router.get("/all", eventController.allEvents);
router.get("/my", authorizeUser, eventController.getMyEvents);
router.get("/:id", eventController.getEventById);

module.exports = router;
