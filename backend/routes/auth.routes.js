const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgetpassword", authController.forgetPassword);
router.get("/resetpassword", authController.resetPassword);

module.exports = router;
