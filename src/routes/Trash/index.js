const express = require("express");
const router = express.Router();
const TrashController = require("../../app/controllers/TrashController");

router.get("/", TrashController.list);

module.exports = router;
