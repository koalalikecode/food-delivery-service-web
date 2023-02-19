const express = require("express");
const router = express.Router();
const OrderController = require("../../app/controllers/OrderController");

router.get("/list", OrderController.list);
router.get("/add", OrderController.add);
router.get("/:id", OrderController.show);
router.get("/edit/:id", OrderController.edit);
router.put("/update/:id", OrderController.update);
router.post("/store", OrderController.store);
router.delete("/delete/:id", OrderController.delete);
router.put("/statusUpdate/:id", OrderController.updateStatus);

module.exports = router;
