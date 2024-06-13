const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");

// Routes for user actions
router.post("/registerevent", authorizeUser, userController.registerEvent);
router.get("/profile", authorizeUser, userController.getUserProfile);
router.post("/removeevent", authorizeUser, userController.removeEvent);

module.exports = router;
