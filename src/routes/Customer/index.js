const express = require("express");
const router = express.Router();
const CustomerController = require("../../app/controllers/CustomerController");

router.get("/list", CustomerController.list);

module.exports = router;
