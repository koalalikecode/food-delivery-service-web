const express = require("express");
const router = express.Router();
const MenuController = require("../../app/controllers/MenuController");

router.get("/list", MenuController.list);
router.get("/add", MenuController.add);

module.exports = router;
