const express = require("express");
const router = express.Router();
const ShippperController = require("../../app/controllers/ShipperController");

router.get("/list", ShippperController.list);
router.get("/add", ShippperController.add);
router.post("/store", ShippperController.store);
router.get("/edit/:id", ShippperController.edit);
router.put("/update/:id", ShippperController.update);
router.delete("/delete/:id", ShippperController.delete);

module.exports = router;
