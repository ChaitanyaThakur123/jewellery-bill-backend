const express = require("express");
const router = express.Router();

const { 
  getAllDailyRates,
  addDailyRate,
  getDailyRate,
  setDailyRate
} = require("../controllers/dailyRateController");

// List all rates
router.get("/list", getAllDailyRates);

// Add a rate
router.post("/add", addDailyRate);

// Get rate for metal + date
router.get("/get-rate/:metal/:date", getDailyRate);

// Set/update rate
router.post("/set-rate", setDailyRate);

module.exports = router;
