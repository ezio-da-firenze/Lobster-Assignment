const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorizeUser, authorizeAdmin } = require("../middlewares/auth");

router.post("/registerevent", authorizeUser, userController.registerEvent);
router.get("/profile", authorizeUser, userController.getUserProfile);

module.exports = router;
