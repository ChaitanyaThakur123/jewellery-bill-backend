const express = require("express");
const router = express.Router();
const db = require("../db");

// Get rate for today's date
router.get("/get-rate/:metal/:date", (req, res) => {
  const { metal, date } = req.params;

  db.query(
    "SELECT rate FROM daily_rates WHERE metal_type=? AND date=?",
    [metal, date],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length > 0) {
        res.json({ found: true, rate: result[0].rate });
      } else {
        res.json({ found: false });
      }
    }
  );
});

// Save/update today rate
router.post("/set-rate", (req, res) => {
  const { metal, rate, date } = req.body;

  db.query(
    `INSERT INTO daily_rates (metal_type, rate, date)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE rate = VALUES(rate)`,
    [metal, rate, date],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});

module.exports = router;
