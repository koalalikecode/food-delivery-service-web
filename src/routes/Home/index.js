const express = require("express");
const router = express.Router();
const passport = require("passport");
const HomeController = require("../../app/controllers/HomeController");
const { ensureAuthenticated } = require("../../config/passport");

router.get("/", HomeController.index);
router.get("/home", ensureAuthenticated, HomeController.home);
router.get("/login", HomeController.login);
router.get("/register", HomeController.register);
router.get("/logout", HomeController.logout);
router.post(
  "/auth/login",
  passport.authenticate("local-login", { failureRedirect: "/login" }),
  HomeController.authLogin
);
router.post(
  "/auth/register",
  passport.authenticate("local-signup", { failureRedirect: "/register" }),
  HomeController.authRegister
);

module.exports = router;
