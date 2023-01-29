const express = require("express");
const router = express.Router();
const OrderController = require("../../app/controllers/OrderController");

router.get("/list", OrderController.list);
router.get("/add", OrderController.add);

module.exports = router;
