const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
// router.get("/events", authController.viewEvents);
// router.post("/register-event", authController.registerEvent);
// router.get("/my-events", authController.manageRegistrations);

module.exports = router;
