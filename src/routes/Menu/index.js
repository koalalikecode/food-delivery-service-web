const express = require("express");
const router = express.Router();
const MenuController = require("../../app/controllers/MenuController");
const { ensureAuthenticated } = require("../../config/passport");

router.get("/list", ensureAuthenticated, MenuController.list);
router.get("/add", ensureAuthenticated, MenuController.add);
router.post("/store", ensureAuthenticated, MenuController.store);
router.get("/edit/:id", ensureAuthenticated, MenuController.edit);
router.put("/update/:id", ensureAuthenticated, MenuController.update);
router.delete("/delete/:id", ensureAuthenticated, MenuController.delete);

module.exports = router;
