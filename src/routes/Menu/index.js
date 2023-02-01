const express = require("express");
const router = express.Router();
const MenuController = require("../../app/controllers/MenuController");

router.get("/list", MenuController.list);
router.get("/add", MenuController.add);
router.post("/store", MenuController.store);
router.get("/edit/:id", MenuController.edit);
router.put("/update/:id", MenuController.update);

module.exports = router;
