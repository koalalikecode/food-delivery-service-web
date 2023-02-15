const express = require("express");
const router = express.Router();
const HomeController = require("../../app/controllers/HomeController");

router.get("/", HomeController.index);
router.get("/login", HomeController.login);
router.get("/register", HomeController.register);

module.exports = router;
