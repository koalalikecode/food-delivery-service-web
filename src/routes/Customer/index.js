const express = require("express");
const router = express.Router();
const CustomerController = require("../../app/controllers/CustomerController");

router.get("/list", CustomerController.list);
router.get("/add", CustomerController.add);
router.post("/store", CustomerController.store);

module.exports = router;
