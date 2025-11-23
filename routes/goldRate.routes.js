const express = require("express");
const router = express.Router();
const { getGoldRates, addGoldRate } = require("../controllers/goldRateController");

// Route to list all gold rates
router.get("/list", getGoldRates);

// Route to add a new gold rate
router.post("/add", addGoldRate);

module.exports = router;
