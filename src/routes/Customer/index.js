const express = require("express");
const router = express.Router();
const CustomerController = require("../../app/controllers/CustomerController");
const { ensureAuthenticated } = require("../../config/passport");

router.get("/list", ensureAuthenticated, CustomerController.list);
router.get("/add", ensureAuthenticated, CustomerController.add);
router.post("/store", ensureAuthenticated, CustomerController.store);
router.get("/edit/:id", ensureAuthenticated, CustomerController.edit);
router.put("/update/:id", ensureAuthenticated, CustomerController.update);
router.delete("/delete/:id", ensureAuthenticated, CustomerController.delete);

module.exports = router;
