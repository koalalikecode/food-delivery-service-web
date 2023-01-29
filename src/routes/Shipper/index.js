const express = require("express");
const router = express.Router();
const ShippperController = require("../../app/controllers/ShipperController");

router.get("/list", ShippperController.list);
router.get("/add", ShippperController.add);
router.post("/store", ShippperController.store);

module.exports = router;
