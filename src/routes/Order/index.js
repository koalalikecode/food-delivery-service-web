const express = require("express");
const router = express.Router();
const OrderController = require("../../app/controllers/OrderController");

router.get("/list", OrderController.list);
router.get("/add", OrderController.add);
router.get("/:id", OrderController.show);
router.post("/store", OrderController.store);
router.delete("/delete/:id", OrderController.delete);

module.exports = router;
