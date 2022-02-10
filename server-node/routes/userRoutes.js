const express = require("express");
const router = express.Router();

const { userRegistration, userLogin, getUserProfile } = require("../controllers/userController");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/profile/:id", getUserProfile);

module.exports = router