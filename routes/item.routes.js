const express = require("express");
const router = express.Router();
const { addItem, getAllItems } = require("../controllers/itemController");

router.get("/list", getAllItems);   // frontend expects this
router.post("/add", addItem);       // frontend expects this

module.exports = router;
