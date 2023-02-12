const express = require("express");
const router = express.Router();
const TrashController = require("../../app/controllers/TrashController");

router.delete("/customer/delete/:id", TrashController.deleteCustomer);
router.post("/customer/restore/:id", TrashController.restoreCustomer);
router.get("/", TrashController.list);

module.exports = router;
