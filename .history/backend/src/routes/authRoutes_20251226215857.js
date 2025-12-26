const express = require("express");
const router = express.Router();
const { login, forgetPassword, resetPassword } = require("../controllers/authController");

router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
