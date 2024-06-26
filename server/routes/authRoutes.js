const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Routes for authentication actions
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;
